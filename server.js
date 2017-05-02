const express = require("express");
const hbs = require("hbs");
const fs = require ("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

/** MIDDLEWARES **/

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile("server.log", log + "\n", (err) => {
		if(err){console.log("Unable to append to server.log")}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

/** HELPERS **/ 

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
	return text.toUpperCase();
})


/** ROUTES **/

app.get("/", (req, res) => {
	res.render("home.hbs", {
		tabTitle: "HomePage",
		pageTitle: "Welcome",
		welcomeMessage: "How's it going?"
	});
});

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		tabTitle: "AboutPage",
		pageTitle: "About Me",
		welcomeMessage: "This is all about me!"
	});
});

app.get("")
app.get("/bad", (req, res) => {
	res.send({
		errorMessage: "BAD BAD BAD request!"
	})
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});