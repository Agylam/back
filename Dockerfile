FROM node:18.15.0-alpine

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json /tmp/app/
RUN cd /tmp/app && npm install

COPY . /usr/src/app
RUN cp -a /tmp/app/node_modules /usr/src/app
COPY ./scripts/wait.sh /opt/wait.sh
COPY ./scripts/startup.sh /opt/startup.sh
RUN sed -i 's/\r//g' /opt/wait.sh
RUN sed -i 's/\r//g' /opt/startup.sh

WORKDIR /usr/src/app
RUN cp .env.example .env
RUN npm run build

CMD ["/opt/startup.sh"]
