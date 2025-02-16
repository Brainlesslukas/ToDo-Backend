FROM node:20-bullseye

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=production

RUN npm install ts-node --save-dev

COPY ./src ./src

EXPOSE 3000

CMD ["npx", "ts-node", "src/main.ts"]
