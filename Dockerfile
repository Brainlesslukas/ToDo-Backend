
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

RUN ls -la /usr/src/app/dist

FROM node:20-alpine AS runner

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

RUN ls -la /usr/src/app/dist

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
