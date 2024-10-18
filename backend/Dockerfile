FROM --platform=linux/arm64 arm64v8/node:16

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
