FROM node:14.18.1-slim

RUN apt-get -q update && apt-get -qy install netcat

WORKDIR /usr/src/app

COPY ./ ./

RUN rm -rf node_modules package-lock.json && npm install 

RUN ls -l

RUN npm install -g @nestjs/cli 

RUN nest build

ENTRYPOINT ["node", "./dist/main"]