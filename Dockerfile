FROM node:10.14.1-alpine
ENV NODE_VERSION 14.8.0
WORKDIR /usr/src/app
RUN apk update && \
    apk add git && \
    npm install -g npm
