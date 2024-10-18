FROM arm64v8/node:22.10-slim

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
