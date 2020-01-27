
# Prerequisites
Make sure `docker` and `docker-compose` are installed.

For example, we can install `docker` desktop on Mac (See `https://docs.docker.com/docker-for-mac/install/`). It also installs `docker-compose`. Then we can use `docker` commands when the docker desktop is running.

# :running:Run the full-stack application
Note, it will take several minutes to build the containers:
```
docker-compose up -d
```
Then 1-2 minutes to finish loading front-end.

See the full-stack application from UI:
```
http://localhost:9000
```
See the back-end APIs on swagger:
```
http://localhost:3000/api-docs
```

# :closed_umbrella:Shutdown the application
```
docker-compose down -v
```

To further delete all images related,
```
docker system prune -a
```
Note this will delete any stopped containers and all unused images.

# :computer:Back-end
## About
A simple backend application using NodeJs, typescript, typeorm, postgres, supertest, swagger, etc.

## Installing / Getting started
```
yarn install
npm start
```
By default, it runs on port 3000.
Can specify the following environmental variables, for example in `.env`
```
NODE_ENV=development

DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=********
DB_NAME=postgres
DB_PORT=5432

PORT=3000
```

## Database schema
When the application starts, it will automatically run the migration scripts to the database.

Can also update/revert the DB schema manually by
```
npm run initDB
```
```
npm run revertDB
```
If so, need to specify the following environment variables:
```
TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_USERNAME = postgres
TYPEORM_PASSWORD = ******
TYPEORM_DATABASE = postgres
TYPEORM_PORT = 5432
TYPEORM_SYNCHRONIZE = true
TYPEORM_LOGGING = true    
TYPEORM_ENTITIES = src/entity/**/*.ts
TYPEORM_MIGRATIONS = src/migration/**/*.ts
TYPEORM_UUID_EXTENSION = pgcrypto
```

## Tests
There are tests for api layer which actually cover most logic of the service layer.
```
npm run test
```

# :herb:Front-end
## About
A simple front-end application using Typescript, Redux, Rxjs, Material UI, Styled-components, Jest, React-testing-library, etc.


## Installing / Getting started
Install dependencies through

```
yarn install
```

Set up `SERVICE_URL` through environment variable. For locally, can use `.env`
```
SERVICE_URL=http://localhost:3000
```
Or pass in through command line  (example is for fish command)
   
```
env SERVICE_URL=http://localhost:3000 npm start  
```

The applications runs on 9000 for local development.

## Tests
There are examples tests for `selector`, `component`, and `epic`, can find under `__tests__` folders.
```
npm run test
```
  
## Other
Rxjs is an experiment here, personally I prefer redux-sagas.

# If I have more time
I have spent 30+ hours to build this application. If I have more time, I would like to add/improve on:

For back-end:
* Api versioning
* Pagination
* Single Sign-On
* Log monitoring

For front-end:
* Notification shows only 1 message, can improve into stacked messages
* Intl messages to support i18n
* `webpack` script for production

