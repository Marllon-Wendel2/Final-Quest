# Final Quest

Sistema de missões gamificadas com autenticação, ranking e interface retro 8-bits.

## Como Rodar

### Pré-requisitos
- Docker e Docker Compose
- Node.js 22+
- npm

### 1. Subir o banco de dados

```bash
docker compose up -d
```

O PostgreSQL fica disponível na porta **5433**.

### 2. Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

O backend roda em `http://localhost:3001`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend roda em `http://localhost:3000`.

### Seed

As missões são criadas automaticamente ao iniciar o backend (5 missões pré-definidas).

## Decisões Técnicas

| Camada | Tecnologia | Motivo |
|--------|-----------|--------|
| Backend | NestJS | Modularização, arquitetura limpa e experiência prévia |
| Frontend | Next.js | Performance, rotas facilitadas e experiência prévia |
| Banco | PostgreSQL + Prisma | Requisitos simples, Prisma oferece legibilidade e type-safety |
| UI | NES.css + estética 8-bits | Visual retro conhecido, AI auxilia na estética, foco em segurança e testes |
| Auth | JWT + bcrypt + httpOnly cookies | Segurança: token não expõe ao frontend, hash protege senhas |
| Validação | Zod | Type-safety com TypeScript, validação declarativa |

## O que ficou de fora

- **Testes automatizados:** Sem tempo para implementar testes unitários e e2e
- **CI/CD:** Pipeline de deploy não configurado
- **Rate limiting:** Não implementado contra ataques de força bruta
- **Fila de requisições:** Race conditions tratadas via constraint do banco + tratamento de erro, mas fila (Bull/Redis) seria mais robusto
- **Recuperação de senha:** Fluxo de reset não implementado
- **Notificações:** Sem sistema de notificação em tempo real

## O que faria com mais prazo

- Testes unitários e e2e com Jest + Supertest
- CI/CD com GitHub Actions
- Rate limiting com @nestjs/throttler
- Fila Bull + Redis para requisições concorrentes
- Recuperação de senha via email
- WebSocket para atualizações em tempo real no ranking
- Página de perfil do jogador com histórico de missões
- Sistema de conquistas/badges
- Paginação na listagem de missões e ranking
