FROM node:20-bullseye AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN ls -alh /usr/src/app/dist

# Runner-Stage
FROM node:20-bullseye AS runner

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/dist /usr/src/app/dist

RUN ls -alh /usr/src/app/dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
