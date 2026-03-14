FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY nestjs/package*.json ./nestjs/

RUN npm install --workspace=nestjs

COPY nestjs/ ./nestjs/

RUN npm run build --workspace=nestjs

ENV NODE_ENV=production

EXPOSE 3002

CMD ["node", "nestjs/dist/main"]
