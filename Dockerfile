FROM node:20

RUN mkdir -p /tmp/frontend-build

COPY package.json yarn.lock /tmp/frontend-build/
COPY .yarn /tmp/frontend-build/.yarn

WORKDIR /tmp/frontend-build

COPY . .

RUN yarn install --immutable

WORKDIR /

CMD bash -c 'yarn && yarn run start'
