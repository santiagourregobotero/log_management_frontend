# pull official base image
FROM node:lts-slim

# set work directory
WORKDIR /srv/app/

# add to $PATH
ENV PATH /srv/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
# RUN npm install --legacy-peer-deps

# add app
COPY . ./