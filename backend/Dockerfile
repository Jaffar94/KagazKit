FROM node:18-alpine

# Install ghostscript
RUN apk add --no-cache ghostscript

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --only=production

# Bundle app source
COPY index.js .

# Expose port
EXPOSE 8080

# Start server
CMD [ "node", "index.js" ]
