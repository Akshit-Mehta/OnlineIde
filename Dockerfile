FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install


# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN cd client
RUN npm install
RUN cd ..

RUN apt-get install g++
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk && \
    apt-get clean;

CMD [ "node", "index.js" ]