
########## This is for development #########

# base image
FROM node:12.14-alpine3.11

# set working directory
WORKDIR ./build

# copy all the files to the container
COPY . .

# install dependencies
RUN yarn install

# build
RUN npm run build

# tell the port number the container should expose
EXPOSE 3000

ENV NODE_ENV=development

# run the command
CMD ["npm", "start"]
