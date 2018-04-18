var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Client-side html files
app.use(express.static("public"))

var limit = 5;

// Create mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "restaurant"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "/public/home.html"));
    });

    app.get("/tables", function (req, res) {
        res.sendFile(path.join(__dirname, "/public/view.html"));
    });

    app.get("/reserve", function (req, res) {
        res.sendFile(path.join(__dirname, "/public/make.html"));
    });

    app.get("/api/tables", function (req, res) {
        connection.query("SELECT * FROM reservations", function (error, results) {
            if (error) throw error;
            res.json(results);
        })
    });

    app.get("/api/waitlist", function (req, res) {
        connection.query("SELECT * FROM waitlist", function (error, results) {
            if (error) throw error;
            res.json(results);
        })
    });

    app.post("/api/tables", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body-parser middleware
        console.log("Posting");
        var reservation = req.body;
        var message;

        // Using a RegEx Pattern to remove spaces from reservation name
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        // reservation.routeName = reservation.name.replace(/\s+/g, "").toLowerCase();

        console.log(reservation);
        connection.query("SELECT * FROM reservations", function (error, results) {
            console.log("Querying");
            var reservationCount = results.length;
            console.log(reservationCount + " reservations");
            var table;
            if (reservationCount < 5) table = "reservations";
            else table = "waitlist";
            var updateQuery = "INSERT INTO ?? SET ?";   
            connection.query(updateQuery,
                [table,
                    {
                        name: `${req.body.name}`,
                        phone: `${req.body.phone}`,
                        email: `${req.body.email}`,
                        displayid: `${req.body.displayId}`
                    }]
                , function (error) {
                    console.log("Updating table");
                    res.json({ "data": reservation });
                });
        });
    });

    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});