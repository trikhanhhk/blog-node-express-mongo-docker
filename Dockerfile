# used node version 18-alpine
FROM node:18

# defined directory working
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "dist/index.js"] 
