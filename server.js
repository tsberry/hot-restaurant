var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var waitlist = [];
var reservations = [];

var limit = 5;

for (var i = 0; i < 5; i++) {
    var nameString = "Res " + (i + 1);
    var numString = "ResPhoneNumber " + (i + 1);
    var emailString = "ResEmail " + (i + 1);
    var idString = "ResID " + (i + 1);
    var routeName = "ResRouteName " + (i + 1);
    reservations.push({
        "name": nameString,
        "phone-number": numString,
        "email": emailString,
        "id": idString,
        "routeName": routeName
    });
}

for (var i = 0; i < 3; i++) {
    var nameString = "Waitlist " + (i + 1);
    var numString = "WaitlistPhoneNumber " + (i + 1);
    var emailString = "WaitlistEmail " + (i + 1);
    var idString = "WaitlistID " + (i + 1);
    var routeName = "WaitlistRouteName " + (i + 1);
    waitlist.push({
        "name": nameString,
        "phone-number": numString,
        "email": emailString,
        "id": idString,
        "routeName": routeName
    });
}

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    console.log("Posting");
    var reservation = req.body;
    var message;

    // Using a RegEx Pattern to remove spaces from reservation name
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    reservation.routeName = reservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(reservation);
    if (reservations.length < limit) {
        console.log("Added to reservations");
        reservations.push(reservation);
        message = "You have made a reservation.";
    }
    else {
        console.log("Added to waitlist");
        waitlist.push(reservation);
        message = "You are on the waitlist.";
    }

    res.json({ "message": message, "data": reservation });
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});