FROM node:lts-alpine

RUN cd ~ && mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY package.json yarn.* ./

USER node

COPY --chown=node:node . .

RUN yarn

EXPOSE 3333


CMD ["yarn", "dev"]
