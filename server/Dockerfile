FROM node:alpine
ENV NODE_ENV production
WORKDIR /usr/src/api
COPY package.json yarn.lock ./
RUN yarn --prod
COPY . .
EXPOSE $NODE_PORT
CMD [ "node", "server.js" ]
