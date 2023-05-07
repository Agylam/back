FROM node:18-alpine as builder
WORKDIR /builder
COPY . .
RUN npm i && npm run build


FROM node:18-alpine
WORKDIR /app
USER node
COPY --from=builder builder/.env builder/database.db builder/package.json builder/package-lock.json builder/tsconfig.json ./
COPY --from=builder builder/build/ ./build
COPY --from=builder builder/node_modules/ ./node_modules

CMD ["node","./build/index.js"]