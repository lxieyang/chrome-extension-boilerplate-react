FROM node:14

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV development

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "yarn", "start" ]