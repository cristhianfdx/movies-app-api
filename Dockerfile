FROM node:lts-alpine

RUN apk add --update --no-cache postgresql-client postgresql-dev

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


