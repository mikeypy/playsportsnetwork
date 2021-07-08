# Very Simple Node REST API using Youtube Data API v3

> Getting Data from Youtube API and store in SQL database and exposing API's using Node.js and Express to interact with the database

> This is has been a fun project! for learning purpose and also for a test.

```
# Routes
GET      /GlobalCyclingNetwork
GET     /GlobalMountainBikeNetwork
GET     /getposts
GET     /getpost/:id
GET     /getposts/:search
DELETE  /deletepost/:id

```

## Usage

```
# Install dependencies
npm install
yarn install

# Install MYSQL Database
Easiest way is to download and install XAMPP from their website - https://www.apachefriends.org/index.html
Start XAMPP and PhpmyAdmin
import the youtube.sql file provided in this project using the import TAB on Phpmyadmin
Also change the ID field to auto increment.

# API Key
Get an API key from Youtube Data v3 from the console.developers.google.com
and store in the variable YOUTUBE_API in the .env file provided

# To test
Use Postman to test the APIs


# Run in develpment
npm run dev
yarn run dev

# Run in production
npm start
yarn start
```

Enjoy!! it was really a fun project getting to the know the Youtube API v3 and all the quota frustrations that comes with it.
