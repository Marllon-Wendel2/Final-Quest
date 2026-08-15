# Final Quest

Sistema de missões gamificadas com autenticação, ranking e interface retro 8-bits.

## Como Rodar do Zero

### Pré-requisitos

- Docker e Docker Compose

### 1. Clonar e configurar

```bash
git clone https://github.com/Marllon-Wendel2/Final-Quest.git
cd Final-Quest
```

Copie os arquivos de exemplo e ajuste as variáveis conforme necessário:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 2. Subir tudo com um comando

```bash
docker compose up -d
```

Isso sobe 4 serviços automaticamente:

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | `http://localhost:3001` | Interface Next.js |
| **Backend** | `http://localhost:3000` | API NestJS |
| **Prisma Studio** | `http://localhost:5555` | UI de gerenciamento do banco |
| **PostgreSQL** | `localhost:5433` | Banco de dados |

> **⚠️ Conflito de portas:** Se alguma dessas portas já estiver em uso, o Docker vai falhar ao iniciar o container correspondente. Para resolver:
> ```bash
> # Verificar o que está usando a porta
> lsof -i :3000
>
> # Matar o processo (substitua <PID>)
> kill <PID>
> ```
> Ou altere as portas no `docker-compose.yml` (lado esquerdo dos `ports`):
> ```yaml
> ports:
>   - "3010:3000"  # usa 3010 no host em vez de 3000
> ```

O backend executa automaticamente:
1. Aguarda o PostgreSQL estar saudável (`healthcheck`)
2. Gera o Prisma Client
3. Aplica migrations pendentes
4. Cria as 5 missões iniciais (seed)

### 3. Acessar

- Abra `http://localhost:3001` no navegador
- Registre uma conta e comece a completar missões

### Comandos úteis

```bash
# Ver logs de todos os serviços
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f backend

# Parar tudo
docker compose down

# Parar e apagar dados (volume do banco)
docker compose down -v

# Reconstruir um serviço específico
docker compose up --build backend
```

---

## Decisões Técnicas e Por quê

### Arquitetura

| Camada | Tecnologia | Motivo |
|--------|-----------|--------|
| Backend | NestJS | Arquitetura modular com dependency injection, separação clara de concerns, decorator-based |
| Frontend | Next.js | SSR/SSG, rotas por arquivo, otimizações de build, ecossistema React |
| Banco | PostgreSQL + Prisma | Type-safety em queries, migrations versionadas,DX superior ao SQL raw |
| UI | NES.css + Press Start 2P | Estética 8-bit coesa, o CSS fornece componentes base e a tipografia Pixel completa o visual |
| Auth | JWT + bcrypt + httpOnly cookies | Token não expõe ao frontend (XSS), bcrypt com salt, cookies httpOnly para storage seguro |
| Validação | Zod | Validação declarativa com inferência de tipos TypeScript, sem duplicação de schemas |

### Docker Compose

- **Entrypoint script** no backend: aguarda DB, gera Prisma Client, roda migrations e inicia o app — evita dependência de scripts externos ou ordem manual de execução
- **Healthcheck no PostgreSQL**: o backend só inicia quando o DB está realmente aceitando conexões, não apenas quando o container existe
- **Prisma Studio como serviço**: permite inspecionar e manipular dados diretamente via UI web, útil para debug e validação durante desenvolvimento
- **Variáveis de ambiente via `.env`**: separação de configuração do código, facilita uso local e em CI/CD

### Backend

- **Prisma Adapter (Pg)**: conexão via Pool do `pg` em vez do driver padrão do Prisma, suporta connection pooling nativo
- **Seed via `OnModuleInit`**: missões iniciais são criadas automaticamente se a tabela estiver vazia — sem script separado, sem passo manual
- **CORS configurado**: origens explícitas, credenciais habilitadas para cookies httpOnly
- **WebSocket (Socket.IO)**: ranking em tempo real via gateway NestJS, notificações quando jogadores completam missões

### Frontend

- **API client com interceptors**: tratamento centralizado de erros, base URL configurável via `NEXT_PUBLIC_API_URL`
- **Estado local com React hooks**: `useState` + `useRef` para controle de animações e dados do usuário, sem necessidade de estado global para uma tela

---

## O que Ficou de Fora ou extras implementados

- [x] **Animação de parabéns**: efeito visual de celebração ao completar missão não implementado
- **Missão por dia, semana, única**: sistema de missões recorrentes (diárias, semanais) não implementado
- **Chat ao vivo com players online**: chat em tempo real entre jogadores não implementado
- **Recuperação de senha**: fluxo de reset não implementado
- **Documentação da API**: sem Swagger/OpenAPI configurado
- **Fila de queries**: concorrência tratada via constraint do banco (`@@unique`) + tratamento de erro, mas sem fila dedicada
- **Rate limiting**: nenhum contra-ataque de força bruta ou abuso de API
- **Testes automatizados**: backend e frontend sem cobertura de testes unitários e e2e
- **CI/CD**: pipeline de build, lint e deploy não configurado
- **Paginação**: listagem de missões e ranking carregam todos os registros
- **Logs estruturados**: logs em texto plano, sem formato JSON para ferramentas de observabilidade

---

## O que Faria com Mais Prazo

**Testes e Qualidade**
- Testes unitários com Jest + mocks do Prisma
- Testes e2e com Supertest cobrindo fluxos de auth, missões e ranking
- Linting automatizado no CI (ESLint + Prettier)
- Coverage mínimo obrigatório

**Infraestrutura e DevOps**
- CI/CD com GitHub Actions (build → test → deploy)
- Docker multi-stage builds para imagens menores
- Rate limiting com `@nestjs/throttler`
- Logs estruturados com pino ou Winston
- Health checks no backend (`/health` endpoint)

**Funcionalidades**
- Fila Bull + Redis para processamento assíncrono de missões concorrentes
- Paginação e busca em missões e ranking
- Recuperação de senha via email (Nodemailer + tokens temporários)
- Sistema de conquistas/badges além dos pontos
- Página de perfil com histórico completo de missões
- Notificações push no frontend via WebSocket

**Segurança**
- Helmet para headers HTTP de segurança
- CSRF protection além dos cookies
- Validação de input em todos os endpoints
- Auditoria de ações (log dewho fez o quê e quando)
