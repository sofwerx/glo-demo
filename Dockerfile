FROM node:9

RUN npm i npm@latest -g

WORKDIR /app

ADD package.json /app/package.json
RUN npm install

ADD . /app

ENV PATH=/app/node_modules/.bin:$PATH

RUN ng build
CMD ng serve --port 4200 --host 0.0.0.0 --disable-host-check

