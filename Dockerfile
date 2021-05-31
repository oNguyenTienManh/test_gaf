FROM node:alpine
ENV APP_HOME /app
RUN apk update --no-cache && \
  apk add --no-cache vim bash python make gcc g++

WORKDIR $APP_HOME

expose 8080
