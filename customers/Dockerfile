FROM node:16-bullseye

WORKDIR /app

COPY ../package*.json ./

RUN npm ci

COPY ./customers .

ENV PORT=5000

EXPOSE 5000

CMD ["node", "index.js"]
