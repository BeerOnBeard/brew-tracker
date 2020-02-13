FROM node:13-slim AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm test
RUN npm run prod:build

FROM node:13-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/server.js .
COPY --from=builder /usr/src/app/MongoDataAccess.js .
RUN npm ci --only=prod
EXPOSE 3000
CMD [ "node", "server.js" ]
