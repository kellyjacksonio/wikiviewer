# WikiViewer

Web application that takes a user’s search query and displays the top 10 most relevant Wikipedia articles built with Node.js, Express, EJS, CSS, Bootstrap, and the MediaWiki API.

## Installation and Setup Instructions

Use the command lines below to clone the repository and start the program. You will need `node` installed globally on your machine.  

```
$ git clone https://github.com/kellyjacksonio/wikiviewer.git
$ cd wikiviewer
$ npm install
$ npm start
```

To Visit App:

`localhost:8080`

## Live Example

Please allow a moment for Heroku to wake up.

[Live](https://wikiviewer-kj.herokuapp.com/)

## Reflection

The idea was inspired by FreeCodeCamp's curriculum to make a simple JS WikiPedia search engine, but I decided to use Node.js to practice my knowledge of running applications on a host server, as well as familiarize myself with making HTTP requests in Node.js to dynamically influence the UI.

Right now, the app only searches for matching/similar titles, but could be expanded to include the content of WikiPedia articles. Another additional functionality would be to save all searches or save the time of a search to a database for statistics on the use of the application.