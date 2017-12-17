var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.use("/styles", express.static(__dirname + "/styles"));

app.set("view engine", "ejs");

var articleTitle = [];
var description = [];
var articleLink = [];
var errorMessage = "";
var displayResults;

app.get("/", function(req, res) {
    res.render("index", {articleTitle: articleTitle, description: description, articleLink: articleLink, displayResults: displayResults, errorMessage: errorMessage});
    displayResults = false;
    errorMessage = "";
});

app.post("/search", function(req, res) {
    var search = req.body.search;
    var apiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" 
    + search + "&limit=10&namespace=0&format=json";
    request(apiURL, function(error, response, body) {
        if(!error && response.statusCode == 200 && search !== "") {
            displayResults = true;
            articleTitle = [];
            description = [];
            articleLink = [];
            errorMessage = "";
            var parsedData = JSON.parse(body);

            parsedData[1].forEach(function(data) {
                articleTitle.push(data);
            });
            console.log(typeof articleTitle + "article titles");
            parsedData[2].forEach(function(data) {
                description.push(data);
            });
            parsedData[3].forEach(function(data) {
                articleLink.push(data);
            });
            res.redirect("/");
        } else if(search === "") {
            errorMessage = "Please enter a search query above";
            res.redirect("/");
        };
    });
});

app.get("*", function(req,res) {
    res.send("Sorry, page not found. Stay on the paved road please."); 
 });

app.listen(3000, function() {
    console.log("server listening :)");
});