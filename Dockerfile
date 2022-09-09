FROM node:16.17

ENV name chrome-extension-boilerplate
ENV port 3000

RUN npm install -g npm-check-updates

RUN mkdir -p /opt/${name}
WORKDIR /opt/${name}
VOLUME /opt/${name}

EXPOSE ${port}
