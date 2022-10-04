FROM node:16.17.0-alpine

WORKDIR /app

COPY . .

RUN yarn

CMD [ "yarn", "dev" ]