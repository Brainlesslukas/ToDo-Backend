FROM node:20-bullseye

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]