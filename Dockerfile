FROM node:18-alpine

# Create app directory
WORKDIR /app

# Bundle app source
COPY src /app

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

RUN yarn run build

EXPOSE 9000
CMD [ "yarn", "start" ]