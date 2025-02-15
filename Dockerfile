FROM node:20-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

RUN npm install -g ts-node-dev@1.1.8

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "--legacy-watch",  "--watch",  "src", "--ext", "ts", "--exec", "ts-node src/main.ts"]
