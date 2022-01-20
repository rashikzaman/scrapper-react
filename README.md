
## Description

This is a next.js application that is a client app for using `search-scrapper` project. It has signup, login and dashboard page.


## Installation

This application depends on `Node.js 12.22.0` or later. 

To install the dependencies, run 

`npm ci`

Create a `.env.local` file from `.env.example`

To start the application, run

`npm run dev`

The application should be avaialble at `localhost:3000`

To test, run

`npm run test`

By default, this application will try to connection with `search-scrapper` using `localhost:8080` port. If the backend server host or port is updated, 
change the entry in `.env.local` file.

