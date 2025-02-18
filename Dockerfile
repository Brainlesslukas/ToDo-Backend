FROM node:20-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @nestjs/cli  # NestJS CLI global installieren

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
