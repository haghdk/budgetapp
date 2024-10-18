FROM --platform=linux/arm64 arm64v8/node:20.18

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
