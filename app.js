const   express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        request     = require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.use("/styles", express.static(__dirname + "/styles"));

app.set("view engine", "ejs");

//
var articleTitle = [];
var description = [];
var articleLink = [];
var errorMessage = "";
var displayResults;

app.get("/", (req, res) => {
    res.render("index", {articleTitle: articleTitle, description: description, articleLink: articleLink, displayResults: displayResults, errorMessage: errorMessage});
    displayResults = false;
    errorMessage = "";
});

app.post("/search", (req, res) => {
    var search = req.body.search;
    var apiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" 
    + search + "&limit=10&namespace=0&format=json";
    request(apiURL, (err, reqRes, body) => {
        if(!err && reqRes.statusCode == 200 && search !== "") {
            var parsedData = JSON.parse(body);
            displayResults = true;
            // clears arrays for new searches
            articleTitle.splice(0, articleTitle.length);
            description.splice(0, description.length);
            articleLink.splice(0, articleLink.length);
            errorMessage = "";

            parsedData[1].forEach((data) => {
                articleTitle.push(data);
            });

            parsedData[2].forEach((data) => {
                description.push(data);
            });
            parsedData[3].forEach((data) => {
                articleLink.push(data);
            });
            res.redirect("/");
        } else if(search === "") {
            errorMessage = "Please enter a search query above";
            res.redirect("/");
        };
    });
});

app.get("*", (req, res) => {
    res.redirect("/"); 
 });

app.listen(3000, () => {
    console.log("server listening :)");
});