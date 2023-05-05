FROM node:18-alpine as builder
COPY . .
RUN npm i && npm run build

FROM node:18-alpine
WORKDIR /app
USER node
COPY --from=builder .env database.db package.json package-lock.json tsconfig.json .
COPY --from=builder build/ ./build
COPY --from=builder node_modules/ ./node_modules

CMD ["node ./build/index.js"]