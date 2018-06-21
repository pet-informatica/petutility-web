FROM node:8-alpine

MAINTAINER PET

WORKDIR web

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
