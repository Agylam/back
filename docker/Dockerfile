FROM node:18-alpine
WORKDIR /app
USER nodejs

COPY . .
RUN npm ci && npm build
