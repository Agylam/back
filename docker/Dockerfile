FROM node:18-alpine as builder
COPY . .
RUN npm i && npm run build

FROM node:18-alpine
WORKDIR /app
USER node
COPY --from=builder /app/build .
CMD ["node ./build/index.js"]

