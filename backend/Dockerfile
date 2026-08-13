FROM node:22-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN chmod +x entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]