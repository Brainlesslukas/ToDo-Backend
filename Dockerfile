FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN npm install -g ts-node-dev@1.1.8

COPY . .

EXPOSE 3000

CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/main.ts"]
