FROM node:8.16.2-alpine

# Set a working directory
WORKDIR /usr/src/app

COPY ./build/package.json .
COPY ./build/yarn.lock .

# Install Node.js dependencies
RUN apk add --no-cache --virtual .gyp python make g++ \
    && yarn install --production --no-progress \
    && apk del .gyp

# Copy application files
COPY ./build .

# Set permissions for the "node" user
RUN chown -R node:node /usr/src/app
RUN chmod 755 /usr/src/app

# Run the container under "node" user by default
USER node

# Set NODE_ENV env variable to "production" for faster expressjs
ENV NODE_ENV production

CMD [ "node", "server.js" ]
