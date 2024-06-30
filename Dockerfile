FROM node:18.20-alpine

WORKDIR /var/www/html/coding-with-me-admin

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build-only