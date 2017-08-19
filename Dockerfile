FROM node:8

MAINTAINER PET

RUN mkdir -pv /www
WORKDIR /www

CMD npm run devStart
