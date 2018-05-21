FROM node:9

RUN npm i npm@latest -g

WORKDIR /app

ADD package.json /app/package.json
RUN npm install

ADD . /app

ENV PATH=/app/node_modules/.bin:$PATH

CMD ng serve --prod --port 4200 --host 0.0.0.0