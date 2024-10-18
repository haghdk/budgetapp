FROM --platform=linux/arm64 arm64v8/node:20

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["node", "server.js"]
