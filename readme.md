## Description

Seed for a full-stack SPA webapp, showcasing ReactJS, react-router, Reflux, Record, browserify (client), Node+Express, MongoDB+Mongoose (server).

## Installation

Requires the following CLI tools installed globally:

``` bash
npm
gulp
mongod   # MongoDB
ln       # shell
mkdir    # shell
```

Clone the repo, then run `npm install` to get the dependencies. This should also create a soft symbolic link of `./app` in `./node_modules` and an empty directory `./mongo-data` in `./`. If this fails for some reason, or if you happen to be using Windows, do it manually. See the postintall script in `package.json`.

## Usage

Run `npm run db` to create the database, Ctrl+C to stop it, then `npm run dev` (or `npm run db`, `gulp` and `npm start` in three Terminal tabs) and start fooling around with the source and the webpage.
