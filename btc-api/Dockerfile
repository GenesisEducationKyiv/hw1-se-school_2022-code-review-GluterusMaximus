FROM node:16-bullseye

WORKDIR /app

COPY ../package*.json ./

RUN npm ci

COPY ./btc-api .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "dev"]
