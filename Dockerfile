FROM node:14-alpine AS build

ENV NODE_ENV development

WORKDIR /srv

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . ./

RUN find ./app -type f -name '*.test.js' -delete && \
  npm run obfuscate && \
  mv ./app-obfuscated/ ./app

RUN npm prune --production

FROM node:14-alpine AS production

ARG PACKAGE_VERSION=none
LABEL PACKAGE_VERSION=${PACKAGE_VERSION}
ARG NODE_ENV=production
LABEL Environment=${NODE_ENV}

WORKDIR /srv

COPY --from=build /srv /srv

CMD [ "npm", "start" ]
