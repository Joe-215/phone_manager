# Phone management API built using Express

Phone number management RESTful APIs built using Node.js, Express and MongoDB

## Features

* No transpilers, just vanilla javascript
* ES2017 latest features like Async/Await
* CORS enabled
* Uses [yarn](https://yarnpkg.com)
* Express + MongoDB ([Mongoose](http://mongoosejs.com/))
* Consistent coding styles with [editorconfig](http://editorconfig.org)
* Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
* Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
* Request validation with [joi](https://github.com/hapijs/joi)
* Gzip compression with [compression](https://github.com/expressjs/compression)
* Linting with [eslint](http://eslint.org)
* Tests with [mocha](https://mochajs.org), [chai](http://chaijs.com) and [sinon](http://sinonjs.org)
* Code coverage with [istanbul](https://istanbul.js.org) and [coveralls](https://coveralls.io)
* Git hooks with [husky](https://github.com/typicode/husky)
* Logging with [morgan](https://github.com/expressjs/morgan)
* Monitoring with [pm2](https://github.com/Unitech/pm2)

## Requirements

* [Node v7.6+](https://nodejs.org/en/download/current/)
* [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

Install dependencies:

```bash
yarn
```

Set environment variables:

```bash
cp .env.example .env
```

## Importing CSV seed

```
yarn import {pathToCsv}
```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Test

```bash
# run all tests with Mocha
yarn test

# run unit tests
yarn test:unit

# run integration tests
yarn test:integration

# run all tests and watch for changes
yarn test:watch

# open nyc test coverage reports
yarn coverage
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

Documentation of APIs are hosted using swagger on the path [/v1/docs](http://localhost:3000/v1/docs)
