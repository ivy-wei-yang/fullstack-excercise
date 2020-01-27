
########## This is for development #########

# base image
FROM node:12.14-alpine3.11

# set working directory
WORKDIR ./build

# set backend service base url
ENV SERVICE_URL http://localhost:3000

# copy all the files to the container
COPY . .

# install dependencies
RUN yarn install

# tell the port number the container should expose
EXPOSE 9000

# run the command
CMD ["npm", "start"]
