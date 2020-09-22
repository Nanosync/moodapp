# CS3219 Mood App

Mood application using a simple JavaScript backend powered by ExpressJS.

## Task B1

### Running API locally

Ensure you have MongoDB installed locally. Then, clone the repository and execute the following commands below:

`npm install`

`npm start`

Visit [http://localhost:4000](http://localhost:4000)

The API is located at [/v1/moods](http://localhost:4000/v1/moods)

### Accessing deployed API

The backend is deployed on Heroku at [http://mood3219.herokuapp.com/](http://mood3219.herokuapp.com/)

The API is located at [/v1/moods](http://mood3219.herokuapp.com/v1/moods)

## Task B2

### Running tests locally

You will need to install a local instance of MongoDB to ensure that the tests may run. Then, clone the repository and run the following commands:

`npm install`

`npm test`

### Running tests via Travis

The build log on Travis may be viewed here:

[![Build Status](https://travis-ci.com/Nanosync/moodapp.svg?token=pKG3662y6aVLLEGjx82L&branch=master)](https://travis-ci.com/Nanosync/moodapp)

## Task B3

### Accessing deployed API

The endpoints are deployed on AWS Lambda via the Serverless framework at [https://vt2iojld9f.execute-api.ap-southeast-1.amazonaws.com/dev/](https://vt2iojld9f.execute-api.ap-southeast-1.amazonaws.com/dev/)

The API is located at [/v1/moods](https://vt2iojld9f.execute-api.ap-southeast-1.amazonaws.com/dev/v1/moods)

