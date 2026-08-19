FROM node:22-alpine AS base

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM base AS development

RUN npx prisma generate

CMD ["npm", "run", "start:dev"]

FROM base AS production

RUN npx prisma generate

RUN npm run build

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]