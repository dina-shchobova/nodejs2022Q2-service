FROM node:16.15.1

WORKDIR /nodejs2022Q2-service

COPY package.json /nodejs2022Q2-service

RUN npm install && npm cache clean --force
ENV PATH=/nodejs2022Q2-service/node_modules/.bin:$PATH

WORKDIR /nodejs2022Q2-service/dev

COPY . .

EXPOSE $PORT

#RUN npm run build
CMD ["npm", "run", "start:dev"]
