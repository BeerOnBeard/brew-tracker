FROM node:13-slim AS builder
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm test
RUN npm run prod:build

FROM node:13-slim
ENV NODE_ENV=production
WORKDIR /home/node/app
COPY --from=builder /home/node/app/package*.json ./
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/server ./server
RUN npm ci --only=prod
USER node
EXPOSE 3000
CMD [ "node", "server/server.js" ]
