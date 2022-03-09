# Simple Message Queue Example
DIRECTORY STRUCTURE
-------------------

      src/api               Resources: controller, route, service, validate files
      src/config            Database configuration files
      src/models            Mongoose schemas
      src/utils             Additional components: helpers, settings, plugins 
      index.ts              Initial file
      server.ts             Server and cache initial file
      router.ts             Merge all routes into one
      
### Installation
Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/tatev-s/hapijs-typescript.git
```
```sh
$ cd hapijs-typescript
```
```sh
$ npm start
```

Create .env file for example
```sh
PORT=3000
HOST=localhost
NODE_ENV=dev
DB_NAME=BookStore
MONGO_URL=mongodb://localhost:27017
REDIS_URL=redis://127.0.0.1:6379
```

You need to install redis on your computer
```
https://redis.io/topics/quickstart
```

