# NPC Fantasma - Sistema de Aparicao e Desaparecimento

> **Nivel:** Intermediario
> **Pre-requisitos:** Conhecimento basico de Phaser 3, TypeScript, Tiled editor e o tutorial de Portas (porta-interacao.md)
> **Objetivo:** Ao final deste tutorial, voce saberá como criar um NPC com sprite sheet de multiplas animacoes (surgimento, idle, morte), detectar proximidade do jogador com uma zona invisivel, e gerenciar estados de vida/morte do NPC.

---

## Indice

1. Visao Geral do Problema
2. Analise do Sprite Sheet
3. O que Vamos Construir
4. Passo 1 - Entendendo os Dados no Tiled (Layer NPC)
5. Passo 2 - Carregando o Sprite no PreloadScene
6. Passo 3 - Criando o Modulo do Fantasma
7. Passo 4 - Integrando o Fantasma no GameScene
8. Passo 5 - Gerenciando Estados (Aparecer / Mover / Morte)
9. Conceitos Chave Usados
10. Trade-offs e Decisoes de Design
11. Exercicios para Praticar

---

## 1. Visao Geral do Problema

Voce tem um ponto no mapa Tiled chamado "Fantasma" (na layer "NPC") que representa a posicao onde um fantasma deve aparecer. O sprite sheet do fantasma (`Ghost.png`) tem 24 frames organizados em 4 linhas, cada uma representando uma fase da animacao.

**O desafio:** O fantasma nao e um tile visual do Tiled - e um point object. Precisamos:
1. Ler a posicao do ponto "Fantasma" do mapa
2. Carregar o sprite sheet com as dimensoes corretas
3. Criar 3 animacoes distintas (surgimento, idle, morte)
4. Detectar quando o jogador se aproxima e afasta
5. Gerenciar o estado do fantasma (invisivel -> aparecendo -> vivo -> morrendo -> invisivel)

---

## 2. Analise do Sprite Sheet

### 2.1 Dimensoes

O arquivo `Ghost.png` tem **480 x 512 pixels**. Analisando a imagem:

```
480px / 6 colunas = 80px por frame (largura)
512px / 4 linhas  = 128px por frame (altura)
```

Cada frame individual e **80x128 pixels**.

### 2.2 Organizacao dos Frames

```
Linha 1 (frames 0-5):   SURGIMENTO - fantasma nasce de particulas
Linha 2 (frames 6-11):  SURGIMENTO - fantasma cresce ate forma completa
Linha 3 (frames 12-17): IDLE - fantasma flutuando (frame 17 = inicio da morte)
Linha 4 (frames 18-23): MORTE - fantasma se desfaz em particulas
```

### 2.3 Por que essa organizacao importa?

Quando voce cria uma spritesheet no Phaser, ele le os frames em ordem: da esquerda para direita, de cima para baixo. Entao:
- Frame 0 = canto superior esquerdo (primeira particula)
- Frame 5 = canto superior direito (fantasma pequeno)
- Frame 11 = segunda linha, ultimo frame (fantasma completo)
- Frame 17 = terceira linha, ultimo frame (idle, antes de comecar a morrer)
- Frame 23 = canto inferior direito (fantasma desapareceu)

### 2.4 Mapeamento visual

```
[ 0] [ 1] [ 2] [ 3] [ 4] [ 5]   <- Surgimento (particulas -> fantasma pequeno)
[ 6] [ 7] [ 8] [ 9] [10] [11]   <- Surgimento (fantasma cresce)
[12] [13] [14] [15] [16] [17]   <- Idle (flutuando) *17 = transicao para morte
[18] [19] [20] [21] [22] [23]   <- Morte (se desfaz)
```

---

## 3. O que Vamos Construir

```
Jogador se aproxima do ponto "Fantasma" (zona de 100x100px)
        |
Overlap detectado -> ghost.show()
        |
+-- isAlive === false? --+
|                         |
| SIM                     |
| -> setVisible(true)     |
| -> play('ghost-appear') |
| -> onComplete:          |
|    play('ghost-idle')   |
|                         |
+-------------------------+
        |
Jogador permanece perto -> idle continua (loop)
        |
Jogador se afasta -> ghost.hide()
        |
+-- isAlive === true? --+-- isDying === false? --+
|                         |                         |
| SIM                     | SIM                     |
| -> stop()               | -> play('ghost-death')  |
| -> isDying = true       | -> onComplete:          |
|                         |    setVisible(false)     |
|                         |    isAlive = false       |
|                         |    isDying = false       |
+-------------------------+-------------------------+
        |
Fantasma invisivel -> pode aparecer novamente
```

---

## 4. Passo 1 - Entendendo os Dados no Tiled (Layer NPC)

### 4.1 A layer NPC

No Tiled, voce criou um **Object Layer** chamado "NPC" com um unico point object:

```json
{
  "id": 22,
  "name": "Fantasma",
  "x": 467.915,
  "y": 355.77,
  "type": "point"
}
```

**Pontos importantes:**
- O nome "Fantasma" e usado para identificar o objeto (diferente das portas que usam `startsWith('Porta')`)
- As coordenadas (467.915, 355.77) sao a posicao exata onde o fantasma vai aparecer
- Nao tem `gid` = nao tem tile visual = precisa criar manualmente no Phaser

### 4.2 Por que uma layer separada?

Na documentacao de portas, as portas estavam na layer "buildings". Para o fantasma, criamos uma layer "NPC" separada porque:
- **Separacao de responsabilidades**: NPCs sao diferentes de buildings
- **Facilidade de manutencao**: e mais facil encontrar e editar NPCs numa layer propria
- **Futuro**: se voce adicionar mais NPCs, todos ficam na mesma layer

### 4.3 Como acessar no Phaser

```typescript
const npcLayer = map.getObjectLayer('NPC');
if (!npcLayer) return;

npcLayer.objects.forEach((obj) => {
  if (obj.name === 'Fantasma') {
    // obj.x = 467.915, obj.y = 355.77
    createGhost(this, obj.x, obj.y);
  }
});
```

**Nota:** Diferente das portas que usamos `startsWith('Porta')` para filtrar varias portas, aqui buscamos um NPC especifico pelo nome exato.

---

## 5. Passo 2 - Carregando o Sprite no PreloadScene

### 5.1 Onde colocar

Abra `frontend/app/components/Phaser/PreloadScene.tsx`. Adicione o carregamento do sprite do fantasma junto com os outros sprites.

### 5.2 Codigo a adicionar

No topo do arquivo, adicione o import:

```typescript
import { loadGhostSprite } from '../animations/Phaser/animes/ghost';
```

Dentro do metodo `preload()`, adicione a chamada:

```typescript
loadGhostSprite(this);
```

### 5.3 Codigo completo do PreloadScene (com as adicoes)

```typescript
import Phaser from 'phaser';
import { loadSprites } from '../animations/Phaser/player/player';
import { loadLambSprite } from '../animations/Phaser/animes/lamb';
import { loadBuildingImages } from '../animations/Phaser/buildings/buildings';
import { loadGhostSprite } from '../animations/Phaser/animes/ghost';  // <-- ADICIONE

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', '/phaser/map/Conseguindo.json');
    this.load.image('Tiles_exterior', '/phaser/map/Tiles_exterior.png');
    this.load.image('water', '/phaser/map/water.png');
    this.load.image('estradas', '/phaser/map/PNG_Tiled/Road1_grass.png');

    this.load.image('special_paper', '/phaser/UI/SpecialPaper.png');
    this.load.audio('door_locked', '/SoundsEffects/macaneta.wav');

    loadBuildingImages(this);
    loadLambSprite(this);
    loadGhostSprite(this);  // <-- ADICIONE
    loadSprites(this);
  }

  create() {
    this.scene.launch('UIScene');
    this.scene.start('GameScene');
  }
}
```

### 5.4 Explicacao

- **`loadGhostSprite`** e uma funcao que vamos criar no proximo passo
- Ela carrega o sprite sheet `Ghost.png` e o registra com a chave `'ghost'`
- O `frameWidth: 80` e `frameHeight: 128` devem bater exatamente com as dimensoes dos frames que calculamos na Secao 2

### 5.5 Validacao

Para testar se carregou, abra o console do navegador (F12) e procure por erros de 404. Se nao aparecer nada, o sprite carregou corretamente. Voce tambem pode verificar no Network tab do DevTools se a requisicao para `Ghost.png` retornou 200.

---

## 6. Passo 3 - Criando o Modulo do Fantasma

### 6.1 Por que um modulo separado?

Seguindo o padrao do projeto:
- `player.ts` -> logica do jogador
- `buildings.ts` -> logica dos predios
- `lamb.ts` -> logica do NPC cordeiro
- `door.ts` -> logica das portas

Criamos `ghost.ts` para a logica do fantasma. Isso segue o principio **Separation of Responsibilities** (Separacao de Responsabilidades).

### 6.2 Criando o arquivo

```
frontend/app/components/animations/Phaser/
+-- animes/
|   +-- lamb.ts      <- ja existe
|   +-- ghost.ts     <- CRIE ESTE ARQUIVO
+-- buildings/
+-- doors/
+-- player/
```

### 6.3 O codigo completo do ghost.ts

```typescript
// animes/ghost.ts

import Phaser from 'phaser';

// --- FUNCAO DE CARREGAMENTO ---
// Carrega o sprite sheet no PreloadScene
export const loadGhostSprite = (scene: Phaser.Scene) => {
    scene.load.spritesheet('ghost', 'phaser/Personagens/Ghost/Ghost.png', {
        frameWidth: 80,
        frameHeight: 128,
    });
};

// --- FUNCAO DE CRIACAO DE ANIMACOES ---
// Cria as 3 animacoes do fantasma
export const createGhostAnimations = (scene: Phaser.Scene) => {
    // Animacao de SURGIMENTO: frames 0-11 (linhas 1 e 2)
    scene.anims.create({
        key: 'ghost-appear',
        frames: scene.anims.generateFrameNumbers('ghost', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: 0,      // Nao repete (executa uma vez)
    });

    // Animacao de IDLE: frames 12-16 (linha 3, sem o ultimo frame)
    scene.anims.create({
        key: 'ghost-idle',
        frames: scene.anims.generateFrameNumbers('ghost', { start: 12, end: 16 }),
        frameRate: 6,   // Mais lento, efeito de flutuacao
        repeat: -1,     // Repete infinitamente (loop)
    });

    // Animacao de MORTE: frames 17-23 (ultimo frame da linha 3 + linha 4)
    scene.anims.create({
        key: 'ghost-death',
        frames: scene.anims.generateFrameNumbers('ghost', { start: 17, end: 23 }),
        frameRate: 10,
        repeat: 0,      // Nao repete (executa uma vez)
    });
};

// --- CONSTANTE ---
const TRIGGER_RADIUS = 50;

// --- FUNCAO PRINCIPAL ---
export const createGhost = (scene: Phaser.Scene, x: number, y: number) => {
    createGhostAnimations(scene);

    const ghost = scene.add.sprite(x, y, 'ghost');
    ghost.setVisible(false);
    ghost.setDepth(1);

    const zone = scene.add.zone(x, y, TRIGGER_RADIUS * 2, TRIGGER_RADIUS * 2);
    scene.physics.add.existing(zone, true);

    let isAlive = false;
    let isDying = false;

    const show = () => {
        if (isAlive || isDying) return;

        isAlive = true;
        ghost.setVisible(true);
        ghost.play('ghost-appear');

        ghost.once('animationcomplete-ghost-appear', () => {
            if (isAlive) {
                ghost.play('ghost-idle');
            }
        });
    };

    const hide = () => {
        if (!isAlive || isDying) return;

        isDying = true;
        ghost.stop();         // Para QUALQUER animacao atual
        ghost.play('ghost-death');

        ghost.once('animationcomplete-ghost-death', () => {
            ghost.setVisible(false);
            isAlive = false;
            isDying = false;
        });
    };

    return { ghost, zone, show, hide };
};
```

### 6.4 Explicacao linha por linha

**`scene.load.spritesheet(key, path, config)`**
- `key`: nome que usamos para referenciar o sprite (`'ghost'`)
- `path`: caminho relativo a pasta `public/`
- `config`: objeto com `frameWidth` e `frameHeight` em pixels

**`scene.anims.create(config)`**
- Cria uma animacao reutilizavel
- `key`: nome da animacao (`'ghost-appear'`)
- `frames`: array de frames do sprite sheet
- `frameRate`: quantos frames por segundo
- `repeat`: `-1` = loop infinito, `0` = executa uma vez

**`scene.anims.generateFrameNumbers('ghost', { start, end })`**
- Gera um array de objetos `{ key: 'ghost', frame: N }` para cada frame de `start` ate `end`
- Frames comecam em 0 (primeiro frame do sprite sheet)

**`scene.add.sprite(x, y, 'ghost')`**
- Cria um sprite visual na posicao (x, y) usando o sprite sheet carregado com chave `'ghost'`

**`ghost.setVisible(false)`**
- Torna o sprite invisivel (nao renderiza, mas existe na cena)

**`ghost.setDepth(1)`**
- Define a profundidade de renderizacao
- Valores maiores ficam "na frente" (acima) de valores menores

**`scene.add.zone(x, y, w, h)`**
- Cria uma **Zone** - game object invisivel com corpo de fisica
- Usada para detectar proximidade do jogador

**`ghost.once('animationcomplete-ghost-appear', callback)`**
- Registra um callback que executa **uma unica vez** quando a animacao termina
- Diferente de `on()` que executaria toda vez

**`ghost.stop()`**
- Para a animacao atual independentemente de qual seja
- Mais seguro que `stop('ghost-idle')` porque funciona mesmo se a animacao atual for o appear

---

## 7. Passo 4 - Integrando o Fantasma no GameScene

### 7.1 Importando o modulo

Abra `frontend/app/components/Phaser/GameScene.tsx` e adicione o import no topo:

```typescript
import { createGhost } from '../animations/Phaser/animes/ghost';
```

### 7.2 Adicionando propriedade na classe

Dentro da classe `GameScene`, adicione uma propriedade para guardar o fantasma:

```typescript
export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
  private water!: Phaser.Tilemaps.TilemapLayer;
  private grass!: Phaser.Tilemaps.TilemapLayer;
  private houses!: Phaser.Physics.Arcade.StaticGroup;
  private doors: Door[] = [];
  private activeDoor: Door | null = null;
  private interactKey!: Phaser.Input.Keyboard.Key;

  // ADICIONE ESTA LINHA:
  private ghost!: ReturnType<typeof createGhost>;
  // ...
}
```

**Nota sobre `ReturnType<typeof createGhost>`:** Em vez de criar uma interface manual, usamos `ReturnType` para pegar automaticamente o tipo do que `createGhost` retorna. Se voce mudar o que `createGhost` retorna, o tipo atualiza automaticamente.

### 7.3 Criando o fantasma no metodo create()

Dentro do metodo `create()`, **depois** de criar as portas:

```typescript
create() {
  // ... codigo existente ...

  this.doors = createDoors(this, map);

  // ADICIONE AQUI - cria o fantasma a partir do mapa
  const npcLayer = map.getObjectLayer('NPC');
  if (npcLayer) {
    npcLayer.objects.forEach((obj) => {
      if (obj.name === 'Fantasma' && obj.x !== undefined && obj.y !== undefined) {
        this.ghost = createGhost(this, obj.x, obj.y);
      }
    });
  }

  // ... resto do codigo existente ...
}
```

### 7.4 Por que verificar obj.x !== undefined?

Point objects no Tiled podem teoricamente ter coordenadas indefinidas. Essa verificacao e uma defesa contra erros no mapa. E o mesmo padrao usado na `createDoors`.

---

## 8. Passo 5 - Gerenciando Estados (Aparecer / Mover / Morte)

### 8.1 Configurando o overlap no create()

Ainda dentro do metodo `create()`, apos criar o fantasma:

```typescript
// ADICIONE AQUI - overlap para detectar proximidade do jogador ao fantasma
if (this.ghost) {
  this.physics.add.overlap(this.player, this.ghost.zone, () => {
    this.ghost.show();
  });
}
```

### 8.2 Detectando saida da zona no update()

No metodo `update()`, adicione a logica de deteccao de saida. Coloque **depois** de `configControls`:

```typescript
update() {
  configControls(this.player, this.controls, this);

  // --- FANTASMA: detectar se jogador saiu da zona ---
  if (this.ghost) {
    const bounds = this.ghost.zone.getBounds();
    const playerBounds = this.player.getBounds();
    const isOverGhost = Phaser.Geom.Intersects.RectangleToRectangle(
      playerBounds,
      bounds
    );
    if (!isOverGhost) {
      this.ghost.hide();
    }
  }

  // ... logica existente das portas ...
}
```

### 8.3 Explicacao do fluxo de estados

O fantasma e uma **maquina de estados** simples:

```
ESTADO          | VISIVEL | ANIMACAO    | TRANSICAO PARA
----------------|---------|-------------|------------------
INVISIVEL       | Nao     | nenhuma     | Jogador entra na zona -> APARECENDO
APARECENDO      | Sim     | appear      | appear termina -> VIVO
VIVO            | Sim     | idle (loop) | Jogador sai da zona -> MORRENDO
MORRENDO        | Sim     | death       | death termina -> INVISIVEL
```

**Por que precisamos de `isDying`?**

Sem `isDying`, o jogador poderia sair e entrar na zona rapidamente:
1. `hide()` chamado -> inicia morte
2. `show()` chamado imediatamente (porque `isAlive` ainda e `true`)
3. Resultado: bug visual, animacoes sobrepostas

`isDying` previne que `show()` seja chamado enquanto a morte esta em andamento.

### 8.4 Por que ghost.stop() sem argumentos?

No `hide()`, usamos `ghost.stop()` em vez de `ghost.stop('ghost-idle')` porque:
- Se o jogador entrar e sair muito rapido, a animacao de aparecendo pode ainda estar tocando
- `stop()` (sem argumentos) para **qualquer** animacao atual
- Depois paramos a morte, garantindo um estado limpo

---

## 9. Conceitos Chave Usados

| Conceito | O que e | Onde usamos |
|----------|---------|-------------|
| **Spritesheet** | Imagem com multiplos frames numa grade | Sprite do fantasma (480x512) |
| **frameWidth/frameHeight** | Dimensoes de cada frame individual | 80x128 pixels |
| **Animation** | Sequencia de frames com velocidade e repeat | appear, idle, death |
| **Sprite** | Game object que renderiza um frame de uma spritesheet | O fantasma visual |
| **Zone** | Game object invisivel com corpo de fisica | Zona de deteccao de proximidade |
| **Overlap** | Deteccao de toque sem bloqueio de movimento | Saber se jogador esta perto |
| **setVisible()** | Mostra/esconde um game object | Fantasma invisivel ate jogador chegar |
| **setDepth()** | Define ordem de renderizacao | Fantasma acima do chao |
| **once()** | Callback que executa uma unica vez | Transicao entre animacoes |
| **stop()** | Para a animacao atual | Parar animacao antes de iniciar outra |
| **Phaser.Geom.Intersects** | Deteccao de colisao entre formas | Verificar se jogador saiu da zona |
| **Object Layer** | Layer do Tiled para objetos (nao tiles) | Layer "NPC" com ponto "Fantasma" |
| **ReturnType** | Tipo TypeScript que pega tipo de retorno de uma funcao | Tipo da propriedade ghost |

---

## 10. Trade-offs e Decisoes de Design

### 10.1 Por que Zone em vez de Circle collider?

| Abordagem | Vantagem | Desvantagem |
|-----------|----------|-------------|
| **Zone (escolhido)** | Simples, leve, sem forma visual | Retangular (nao circular) |
| **Circle collider** | Forma mais natural para "raio" | Mais complexo, corpo dinamico |

Para uma zona de proximidade simples, Zone e suficiente. Se voce quiser um raio perfeito no futuro, pode usar `scene.add.circle()` com corpo de fisica.

### 10.2 Por que funcoes show()/hide() em vez de expor isAlive?

| Abordagem | Vantagem | Desvantagem |
|-----------|----------|-------------|
| **show()/hide()** | Encapsula estado, previne estados invalidos | Menos flexivel |
| **Expor isAlive** | Total controle | Facil criar bugs de estado |

A abordagem com funcoes e mais segura porque:
- Voce nao pode esquecer de setar `isDying = true` (ja esta dentro de `hide()`)
- So tem 2 acoes possiveis: mostrar ou esconder
- O GameScene nao precisa se importar com como o estado muda

### 10.3 Por que ler NPC layer do mapa em vez de hardcodar coordenadas?

| Abordagem | Vantagem | Desvantagem |
|-----------|----------|-------------|
| **Ler do mapa** | Flexivel, qualquer pessoa pode mudar no Tiled | Mais codigo |
| **Hardcodar** | Menos codigo | Rigido, qualquer mudanca requer codigo |

Ler do mapa e melhor porque:
- Designer pode mover o fantasma no Tiled sem mexer no codigo
- Se voce adicionar mais NPCs, o mesmo padrao funciona
- Coordenadas ficam documentadas no proprio mapa

### 10.4 Por que ghost.ts em vez de adicionar direto no GameScene?

| Abordagem | Vantagem | Desvantagem |
|-----------|----------|-------------|
| **Modulo separado** | Reutilizavel, limpo, testavel | Arquivo extra |
| **Direto no GameScene** | Tudo num lugar | GameScene fica gigante, dificil de manter |

Seguindo o padrao do projeto (lamb.ts, buildings.ts, door.ts), manter ghost.ts separado e a decisao correta.

### 10.5 Tamaho da zona de deteccao (TRIGGER_RADIUS = 50)

- **Muito pequeno (10-15)**: jogador tem que encostar no fantasma para ativar
- **50 (escolhido)**: jogador ativa quando esta razoavelmente perto
- **Muito grande (100+)**: fantasma aparece mesmo quando jogador esta longe

50 pixels (zona total de 100x100) e um bom equilibrio para 8-bit RPGs.

---

## 11. Exercicios para Praticar

### Exercicio 1: Zona visivel (debug)

Para ver a zona de deteccao durante o desenvolvimento, adicione apos criar a zone no `ghost.ts`:

```typescript
const debugGraphics = scene.add.graphics();
debugGraphics.lineStyle(2, 0xff00ff);
debugGraphics.strokeRect(
  x - TRIGGER_RADIUS,
  y - TRIGGER_RADIUS,
  TRIGGER_RADIUS * 2,
  TRIGGER_RADIUS * 2
);
```

Lembre de remover depois!

### Exercicio 2: Som no fantasma

Adicione um efeito sonoro. No `PreloadScene.tsx`:

```typescript
this.load.audio('ghost_appear', '/SoundsEffects/ghost_appear.wav');
```

No `ghost.ts`, toque o som na funcao `show()`:

```typescript
const show = () => {
    if (isAlive || isDying) return;
    scene.sound.play('ghost_appear');
    isAlive = true;
    // ...
};
```

### Exercicio 3: Ghost mais lento ou mais rapido

Mude o `frameRate` das animacoes para ver o efeito:
- `frameRate: 5` = muito lento (estilo horror)
- `frameRate: 15` = muito rapido (estilo cartoon)
- `frameRate: 10` = original (bom equilibrio)

### Exercicio 4: Ghost com fade

Em vez de aparecer de uma vez, faca um fade in. No `show()`:

```typescript
ghost.setAlpha(0);
ghost.setVisible(true);
ghost.play('ghost-appear');

scene.tweens.add({
    targets: ghost,
    alpha: 1,
    duration: 500,
});
```

### Exercicio 5: Mais de um fantasma

1. No Tiled, adicione mais points no layer "NPC" com nome "Fantasma"
2. Mude a propriedade `ghost` para um array:

```typescript
private ghosts: ReturnType<typeof createGhost>[] = [];
```

3. No `create()`, use `forEach`:

```typescript
const npcLayer = map.getObjectLayer('NPC');
if (npcLayer) {
    npcLayer.objects.forEach((obj) => {
        if (obj.name === 'Fantasma' && obj.x !== undefined && obj.y !== undefined) {
            this.ghosts.push(createGhost(this, obj.x, obj.y));
        }
    });
}
```

### Exercicio 6: Ghost so aparece uma vez

Adicione uma flag na GameScene:

```typescript
private ghostDefeated = false;

// Na criacao do overlap:
this.physics.add.overlap(this.player, this.ghost.zone, () => {
    if (!this.ghostDefeated) {
        this.ghost.show();
    }
});

// Na funcao hide, apos a animacao de morte:
ghost.once('animationcomplete-ghost-death', () => {
    ghost.setVisible(false);
    isAlive = false;
    isDying = false;
    this.ghostDefeated = true;
});
```

---

> **Parabens!** Voce agora sabe como criar um NPC com sistema de aparicao/desaparecimento em Phaser 3. Esse padrao de **state machine** (maquina de estados) com `show()`/`hide()` e muito util para qualquer NPC interativo.
