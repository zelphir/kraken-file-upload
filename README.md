# Kraken File Upload

## Getting Started
To run this app you'll need NodeJS, Yarn and Docker. The client app has been built using `react` and the api using `express`.
Versions used for this project:
- NodeJS v10.5.0
- Yarn -v1.7.0
- Docker v18.03.1-ce
- Express v4.16.3
- React v16.4.0

## Run in Docker
Simply run `docker-compose up` to build the images and start the two containers (pass the `-d` to run it in background), this should take less than a couple of minutes. `docker-compose` will use `node:alpine` as base image to serve the api container and as a build container to build the client thanks to the `multi-stage builds`. After the build is done it will then serve the static files using `nginx:alpine`.

You can control the ports used by Docker changing the values in the `.env` file. By default the client will be served at `http://0.0.0.0:9000` and the api at `http://0.0.0.0:5000`. If runnin in detach mode (flag `-d`) you can check the running containers with `docker-compose ps`.

## Run in dev mode
Before starting the apps in dev mode we need to install all the dependencies. Simply run in the root `yarn`. This will install all the dependencies for both apps thanks to a postinstall script.

You coud use `npm` running `npm run install` and the postinstall script should install all the deps using the right node package manager thanks to `$npm_execpath`.

#### Api (server folder)
Once the deps are installed you can start the `api` running `yarn start` or in watch mode using `nodemon` with `yarn dev`.

To run the tests use `yarn test`, you can pass the `--watch` flag to run the tests in watch mode. i.e. `yarn test --watch`. The test framework is `jest`.

The api is using an in-memory database (`nedb`) just to keep a reference of the uploaded files and store the original file name because the file name once uploaded is replaced with a uuid.

#### React app (client folder)
Again, after deps are installed you can run the app in watch mode using `yarn start`, build the app using `yarn build` and run the tests with `yarn test` or `yarn test --watch`.

The tool used to transpile, build and serve in dev mode the app is `parcel.js`. I've also used `blueprintjs` as css framework for quick prototyping.

`redux` is used as state management and if you have the `redux devtools` extension installed in your browser you can check/debug it.

The app has been built for desktop only mainly because `blueprintjs` is a css framework desktop oriented.

## Goodies
The project is using `eslint` to lint the code and `prettier` to format it. It's an automated task that runs in a git commit hook. Everytime there is a new commit the whole project will be linted, tested and if the previous steps are ok will be formatted using prettier.

To see the test coverage you can run `yarn test --coverage` in each folder (client and server).
