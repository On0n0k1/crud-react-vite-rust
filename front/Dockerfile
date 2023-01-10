FROM node:latest

WORKDIR /app

RUN pwd
COPY ./front/package.json .

RUN npm i

COPY ./front .

EXPOSE 5173

CMD ["npm", "run", "dev"]