# CS3219 Mood App

Mood application using a simple JavaScript backend powered by ExpressJS and frontend SPA powered by Vue.

## Task B1

### Running API locally

#### Prerequisites
- Local instance of MongoDB

Clone the repository and execute the following commands:

`npm install`

`npm start`

Visit the API at [http://localhost:4000/api/v1/moods](http://localhost:4000/api/v1/moods)

The base URL is [http://localhost:4000/api/v1](http://localhost:4000/api/v1)

### Accessing deployed API

The API is deployed on Heroku at [https://mood3219.herokuapp.com/api/v1/moods](https://mood3219.herokuapp.com/api/v1/moods)

The base URL is [https://mood3219.herokuapp.com/api/v1](https://mood3219.herokuapp.com/api/v1)

## Task B2

### Running tests locally

#### Prerequisites
- Local instance of MongoDB

Clone the repository and execute the following commands:

`npm install`

`npm test`

### Running tests via Travis

The build log on Travis may be viewed here:

[![Build Status](https://travis-ci.com/Nanosync/moodapp.svg?token=pKG3662y6aVLLEGjx82L&branch=master)](https://travis-ci.com/Nanosync/moodapp)

## Task B3

### Accessing deployed API

The API is deployed on AWS Lambda via the Serverless framework at [https://vt2iojld9f.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/moods](https://vt2iojld9f.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/moods)

The base URL is [https://vt2iojld9f.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1](https://vt2iojld9f.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1)

## Task B4

### Setting up the frontend

The frontend SPA was built with Vue, and styling implemented using Bootstrap.

#### Prerequisites
- Local instance of MongoDB
- Local API server from Task B1

Clone the repository, then execute the following commands:

`cd client`

`npm install`

`npm run serve`

Visit [http://localhost:8080/](http://localhost:8080/)

You may also view a live deployment on Heroku at [https://mood3219.herokuapp.com](https://mood3219.herokuapp.com)
