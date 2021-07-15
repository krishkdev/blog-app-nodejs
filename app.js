//All Imports
const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
//Initialize Express
const app = express();

//Port number
const PORT = process.env.PORT || 4000;

//DB URI (Connect to MongoDB)
const dbURI =
  "mongodb+srv://krishna:kkks1234@nodejs-blogapp.xwld4.mongodb.net/node-blogApp?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to DB");
    //Listen for requests
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

// Telling express that we are using ejs in this project (Register view engine)
app.set("view engine", "ejs");
/* app.set("views", "docs"); */

//Static files middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//mongoose and mongo sandbox routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
