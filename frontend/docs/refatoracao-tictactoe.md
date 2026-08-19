# Refatoração do TicTacToe — Separação de Responsabilidades

> **Autor:** Marllon | **Data:** Agosto 2026
> **Arquivo-alvo:** `app/components/minigames/TicTacToe.tsx`
> **Estado atual:** 363 linhas, 6 responsabilidades misturadas

---

## 1. Diagnóstico — Por que o código precisa de refatoração

### 1.1 O problema: "God Component"

O `TicTacToe.tsx` é um exemplo clássico de **God Component** — um componente que acumula
toda a responsabilidade da feature num único arquivo. Isso viola o **Princípio da
Responsabilidade Única (SRP)** do SOLID.

**Responsabilidades atuais no arquivo (363 linhas):**

| Faixa de linhas | Responsabilidade | Tipo |
|---|---|---|
| 32–37 | Estado do jogo (6 `useState`) | Estado |
| 42–75 | Conexão com socket (listeners + emit + cleanup) | Efeitos colaterais |
| 77–93 | `handleCellClick`, `handleResultComplete` | Lógica de negócio |
| 95–123 | `getStatusText`, `getStatusColor` | Lógica de apresentação |
| 125–173 | JSX / template do componente | Render |
| 174–360 | `style jsx` (~186 linhas) | Estilização |

### 1.2 Consequências práticas

```
Modificação na lógica do jogo → toca no mesmo arquivo que tem os estilos
Bug no render → precisa navegar por 363 linhas para encontrar
Teste unitário → impossível testar lógica de socket sem renderizar o componente
Reuso do board → não é possível, está acoplado ao TicTacToe
Code review → difícil isolar o que mudou: lógica? estilo? render?
```

---

## 2. Estratégia de Separação

### 2.1 Princípio guia: Separation of Concerns

Cada arquivo deve ter **uma e apenas uma razão para mudar**.

```
┌─────────────────────────────────────────────────┐
│              TicTacToe.tsx (Orquestrador)        │
│  Compora sub-componentes, passa props, conecta   │
│  o hook ao render. NÃO contém lógica nem estilo. │
└───────┬──────────┬──────────┬──────────┬────────┘
        │          │          │          │
   ┌────▼───┐ ┌───▼────┐ ┌───▼────┐ ┌───▼─────┐
   │Header  │ │ Status │ │ Board  │ │ Footer  │
   │(15 ln) │ │(15 ln) │ │(30 ln) │ │(20 ln)  │
   └────────┘ └────────┘ └────────┘ └─────────┘

   ┌──────────────────┐    ┌─────────────────────┐
   │ useTicTacToe.ts  │    │ TicTacToe.module.css│
   │ (70 ln)          │    │ (186 linhas)        │
   │ Estado + Socket  │    │ Estilos isolados    │
   └──────────────────┘    └─────────────────────┘
```

### 2.2 Estrutura de arquivos resultante

```
frontend/
├── hooks/
│   └── useTicTacToe.ts              ← NOVO (lógica + estado)
├── app/components/minigames/
│   ├── TicTacToe/
│   │   ├── TicTacToe.tsx            ← REFATORADO (orquestrador)
│   │   ├── TicTacToeBoard.tsx       ← NOVO (grid 3x3)
│   │   ├── TicTacToeHeader.tsx      ← NOVO (título + close)
│   │   ├── TicTacToeStatus.tsx      ← NOVO (status display)
│   │   ├── TicTacToeFooter.tsx      ← NOVO (recompensa + botão)
│   │   └── TicTacToe.module.css     ← NOVO (estilos)
│   └── ChallengeRouter.tsx          ← ATUALIZAR import
```

---

## 3. Tradeoffs e Justificativas

### 3.1 Tradeoff: Complexidade vs Manutenibilidade

| Decisão | Prós | Contras |
|---|---|---|
| Muitos arquivos | Cada arquivo é pequeno e focado | Mais imports, mais navegação |
| Sub-componentes | Reuso, testabilidade | Overhead de props drilling |
| CSS Module | Escopo isolado, autocomplete IDE | Quebra `style jsx` existente |
| Custom hook | Lógica testável isoladamente | Mais uma camada de abstração |

**Por que vale a pena:** O ganho em manutenibilidade supera o custo de navegação.
Quando você precisa mudar a lógica do socket, vai **um arquivo**. Quando precisa ajustar
o visual do board, vai **outro arquivo**. Isso é exatamente o que um reviewer de código quer.

### 3.2 Tradeoff: Sub-componentes vs Tudo Junto

**Argumento contra sub-componentes:** "É só um jogo da velha, não precisa de tanta
abstração."

**Contra-argumento:** O `ChallengeRouter` já mapeia tipos de desafio para componentes.
Quando você adicionar `MEMORY`, `SNAKE`, ou `CHESs`, terá uma estrutura consistente
para seguir. Cada novo minigame segue o mesmo padrão: hook + sub-componentes + CSS Module.

### 3.3 Tradeoff: CSS Module vs `style jsx`

| | `style jsx` (atual) | CSS Module |
|---|---|---|
| Escopo | Automático por componente | Automático por arquivo |
| IDE support | Limitado | Completo (autocomplete, goto def) |
| Performance | Runtime injection | Build-time extraction |
| Compatibilidade | Next.js específico | Padrão da indústria |
| Manutenção | Misturado com lógica | Arquivo separado |

**Decisão:** CSS Module. É o padrão do Next.js, tem suporte nativo, e isola 186 linhas
de CSS do componente React.

---

## 4. Implementação Detalhada

### 4.1 Hook: `useTicTacToe.ts`

**Responsabilidade:** TODO o estado e lógica do jogo. Zero referência a UI.

```typescript
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  emitStartGame,
  emitPlayerMove,
  onGameCreated,
  onGameUpdated,
  onGameOver,
  onGameError,
  offGameEvents,
} from '../../api/socket';
import { GameResult } from '../components/GameResultAnimation';

type GameStatus = 'waiting' | 'playing' | 'won' | 'lost' | 'draw';
type Board = (string | null)[];

interface UseTicTacToeReturn {
  board: Board;
  status: GameStatus;
  isPlayerTurn: boolean;
  lastBotMove: number | null;
  gameResult: GameResult | null;
  statusText: string;
  statusColor: string;
  handleCellClick: (position: number) => void;
  handleResultComplete: () => void;
}

export function useTicTacToe(
  missionId: string,
  onSuccess: () => void,
  onClose: () => void,
): UseTicTacToeReturn {
  const [gameId, setGameId] = useState<string | null>(null);
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [status, setStatus] = useState<GameStatus>('waiting');
  const [lastBotMove, setLastBotMove] = useState<number | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  useEffect(() => {
    onGameCreated((data) => {
      setGameId(data.gameId);
      setBoard(data.board);
      setIsPlayerTurn(data.currentPlayer === 'X');
      setStatus('playing');
    });

    onGameUpdated((data) => {
      setBoard(data.board);
      setStatus(data.status);
      setIsPlayerTurn(data.currentPlayer === 'X');
      if (data.botMove !== undefined) {
        setLastBotMove(data.botMove);
      }
    });

    onGameOver((data) => {
      setStatus(data.result);
      setGameResult(data.result);
    });

    onGameError((data) => {
      console.error('Game error:', data.message);
    });

    emitStartGame(missionId);

    return () => {
      offGameEvents();
    };
  }, [missionId]);

  const handleCellClick = useCallback(
    (position: number) => {
      if (!gameId || !isPlayerTurn || status !== 'playing') return;
      if (board[position] !== null) return;
      emitPlayerMove(gameId, position);
    },
    [gameId, isPlayerTurn, status, board],
  );

  const handleResultComplete = useCallback(() => {
    if (gameResult === 'won') {
      onSuccessRef.current();
    }
    setGameResult(null);
    onClose();
  }, [gameResult, onClose]);

  const statusText = (() => {
    switch (status) {
      case 'waiting': return 'Conectando...';
      case 'playing': return isPlayerTurn ? 'Sua vez! (X)' : 'Vez do bot...';
      case 'won':     return 'VITÓRIA!';
      case 'lost':    return 'DERROTA!';
      case 'draw':    return 'EMPATE!';
      default:        return '';
    }
  })();

  const statusColor = (() => {
    switch (status) {
      case 'won':  return '#4ade80';
      case 'lost': return '#ef4444';
      case 'draw': return '#eab308';
      default:     return 'var(--gold)';
    }
  })();

  return {
    board,
    status,
    isPlayerTurn,
    lastBotMove,
    gameResult,
    statusText,
    statusColor,
    handleCellClick,
    handleResultComplete,
  };
}
```

**Pontos-chave desta extração:**
- `statusText` e `statusColor` são **valores derivados**, não estado. São computados
  a cada render a partir de `status` e `isPlayerTurn`.
- O hook encapsula **completamente** a API de socket. O componente pai nunca fala
  com socket diretamente.
- `onSuccessRef` preserva a referência estável para evitar re-renders desnecessários.

---

### 4.2 Sub-componentes

#### `TicTacToeHeader.tsx`

```tsx
import styles from './TicTacToe.module.css';

interface TicTacToeHeaderProps {
  missionTitle: string;
  onClose: () => void;
}

export default function TicTacToeHeader({ missionTitle, onClose }: TicTacToeHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>⚔️ JOGO DA VELHA</h2>
      <p className={styles.subtitle}>{missionTitle}</p>
      <button onClick={onClose} className={styles.close}>✕</button>
    </div>
  );
}
```

#### `TicTacToeStatus.tsx`

```tsx
import styles from './TicTacToe.module.css';

interface TicTacToeStatusProps {
  text: string;
  color: string;
}

export default function TicTacToeStatus({ text, color }: TicTacToeStatusProps) {
  return (
    <div className={styles.status} style={{ color }}>
      {text}
    </div>
  );
}
```

#### `TicTacToeBoard.tsx`

```tsx
import { GameStatus } from './TicTacToe';
import styles from './TicTacToe.module.css';

type Board = (string | null)[];

interface TicTacToeBoardProps {
  board: Board;
  onCellClick: (position: number) => void;
  lastBotMove: number | null;
  isPlayerTurn: boolean;
  status: GameStatus;
}

export default function TicTacToeBoard({
  board,
  onCellClick,
  lastBotMove,
  isPlayerTurn,
  status,
}: TicTacToeBoardProps) {
  return (
    <div className={styles.board}>
      {board.map((cell, index) => (
        <button
          key={index}
          className={`${styles.cell} ${
            cell === 'X' ? styles.cellX : cell === 'O' ? styles.cellO : ''
          } ${lastBotMove === index ? styles.cellBotLast : ''}`}
          onClick={() => onCellClick(index)}
          disabled={!isPlayerTurn || status !== 'playing' || cell !== null}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}
```

#### `TicTacToeFooter.tsx`

```tsx
import { GameStatus } from './TicTacToe';
import styles from './TicTacToe.module.css';

interface TicTacToeFooterProps {
  points: number;
  status: GameStatus;
  onClose: () => void;
}

export default function TicTacToeFooter({ points, status, onClose }: TicTacToeFooterProps) {
  return (
    <>
      <div className={styles.reward}>
        <span className={styles.rewardIcon}>💎</span>
        <span className={styles.rewardText}>{points} PTS</span>
      </div>

      {(status === 'lost' || status === 'draw') && (
        <button onClick={onClose} className={`${styles.btn} ${styles.btnClose}`}>
          FECHAR
        </button>
      )}
    </>
  );
}
```

---

### 4.3 Componente Orquestrador: `TicTacToe.tsx`

```tsx
'use client';

import GameResultAnimation from '../GameResultAnimation';
import { useTicTacToe } from '../../../hooks/useTicTacToe';
import TicTacToeHeader from './TicTacToeHeader';
import TicTacToeStatus from './TicTacToeStatus';
import TicTacToeBoard from './TicTacToeBoard';
import TicTacToeFooter from './TicTacToeFooter';
import styles from './TicTacToe.module.css';

interface TicTacToeProps {
  missionId: string;
  missionTitle: string;
  points: number;
  onSuccess: () => void;
  onClose: () => void;
}

export default function TicTacToe({
  missionId,
  missionTitle,
  points,
  onSuccess,
  onClose,
}: TicTacToeProps) {
  const {
    board,
    status,
    isPlayerTurn,
    lastBotMove,
    gameResult,
    statusText,
    statusColor,
    handleCellClick,
    handleResultComplete,
  } = useTicTacToe(missionId, onSuccess, onClose);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <TicTacToeHeader missionTitle={missionTitle} onClose={onClose} />
        <TicTacToeStatus text={statusText} color={statusColor} />
        <TicTacToeBoard
          board={board}
          onCellClick={handleCellClick}
          lastBotMove={lastBotMove}
          isPlayerTurn={isPlayerTurn}
          status={status}
        />
        <TicTacToeFooter points={points} status={status} onClose={onClose} />
      </div>

      {gameResult && (
        <GameResultAnimation
          result={gameResult}
          missionTitle={missionTitle}
          points={points}
          onComplete={handleResultComplete}
        />
      )}
    </div>
  );
}
```

**Comparação antes/depois:**

```
ANTES:  TicTacToe.tsx → 363 linhas, 6 responsabilidades
DEPOIS: TicTacToe.tsx → ~45 linhas, 1 responsabilidade (orquestração)
```

---

### 4.4 CSS Module: `TicTacToe.module.css`

TODO o bloco `style jsx` (linhas 174–360) é convertido para CSS Module.
A única mudança é substituir seletores `.minigame-*` por classes CSS Module:

```css
/* Exemplo da conversão */

/* ANTES (style jsx): */
.minigame-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
}

/* DEPOIS (CSS Module): */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
}
```

E no componente, `className="minigame-overlay"` vira `className={styles.overlay}`.

---

### 4.5 Atualização do `ChallengeRouter.tsx`

```diff
- import TicTacToe from './TicTacToe';
+ import TicTacToe from './TicTacToe/TicTacToe';
```

---

## 5. Como Defender Isso em Entrevista

### 5.1 Pergunta provável do recrutador:

> "Me fala de uma situação onde você refatorou um código e o que motivou isso."

### 5.2 Resposta modelo (método STAR):

**Situação:**
"O componente `TicTacToe` tinha 363 linhas com lógica de socket, estado, render,
estilos e helpers de UI tudo misturado."

**Tarefa:**
"Precisávamos adicionar novos tipos de minigames (Memory, Snake) e o componente
não permitia reuso nem manutenção isolada."

**Ação:**
"Separei em 7 arquivos seguindo o Single Responsibility Principle:
- Um **custom hook** (`useTicTacToe`) encapsulando estado e lógica de socket
- **4 sub-componentes** (Header, Status, Board, Footer) para UI
- Um **CSS Module** para estilos
- O componente principal virou um orquestrador de ~45 linhas"

**Resultado:**
"Cada arquivo passou a ter uma razão única para mudar. Testes unitários ficaram
possíveis (podia testar o hook isoladamente). E quando adicionei o jogo da memória,
seguimos exatamente o mesmo padrão."

### 5.3 Conceitos-chave para mencionar

| Conceito | O que é | Como se aplica aqui |
|---|---|---|
| **SRP (Single Responsibility)** | Cada módulo faz uma coisa | Hook = lógica, Component = render, CSS = estilo |
| **Separation of Concerns** | Separar por tipo de responsabilidade | Estado, apresentação e estilização em camadas distintas |
| **Custom Hooks** | Extrair lógica reativa do componente | `useTicTacToe` encapsula socket + estado |
| **Composition** | Compor UI a partir de peças pequenas | TicTacToe = Header + Status + Board + Footer |
| **Encapsulamento** | Esconder detalhes de implementação | O componente não sabe como o socket funciona |
| **Testabilidade** | Facilidade de escrever testes | Hook testável sem render, componentes com props previsíveis |
| **CSS Modules** | Estilos com escopo isolado por arquivo | Zero conflitos de nomenclatura |

### 5.4 Objeções comuns e respostas

**"Mas é muitos arquivos para um jogo da velha simples..."**
> "Concordo que para um protótipo isolado seria over-engineering. Mas esse componente
> faz parte de um sistema de minigames (ChallengeRouter). Cada novo jogo segue o
> mesmo padrão, então o investimento se multiplica com cada feature nova."

**"Não é mais simples manter tudo junto?"**
> "Sim, no curto prazo. Mas quando você precisa mudar a lógica do socket e alguém
> está ajustando os estilos no mesmo arquivo, o risco de conflito e bug aumenta.
> A separação elimina essa fricção."

**"Quanto tempo levou?"**
> "A refactorização levou cerca de 15 minutos porque é basicamente mover código
> existente para arquivos separados. Sem lógica nova, sem risco de regressão."

---

## 6. Checklist de Implementação

- [ ] Criar `hooks/useTicTacToe.ts` com lógica extraída
- [ ] Criar pasta `components/minigames/TicTacToe/`
- [ ] Criar `TicTacToeHeader.tsx`
- [ ] Criar `TicTacToeStatus.tsx`
- [ ] Criar `TicTacToeBoard.tsx`
- [ ] Criar `TicTacToeFooter.tsx`
- [ ] Criar `TicTacToe.module.css` (converter `style jsx`)
- [ ] Refatorar `TicTacToe.tsx` (orquestrador)
- [ ] Atualizar import no `ChallengeRouter.tsx`
- [ ] Verificar que `npm run build` passa sem erros
- [ ] Testar manualmente: iniciar jogo, jogar, verificar sockets
- [ ] Verificar responsividade mobile (media query 480px)

---

## 7. Referências

- [React Docs: Extracting State into a Custom Hook](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Next.js: CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#css-modules)
- [SOLID: Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
- [Martin Fowler — Composition over Inheritance](https://martinfowler.com/boi/2004/01/26/in-vs-ref.html)
