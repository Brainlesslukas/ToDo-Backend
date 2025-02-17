FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

ENV NODE_ENV=production

# 1️⃣1️⃣ Exponiere den Port
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
