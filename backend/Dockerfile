FROM node:22-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]