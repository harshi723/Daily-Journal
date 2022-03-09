const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/blogposts', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const homeStartingContent =
  "Labore et enim adipisicing nulla nulla laboris quis enim. Velit velit sunt do veniam consequat dolor ipsum irure fugiat sit. Aute officia irure sunt est Lorem elit. Nulla ad culpa incididunt esse sit excepteur non laboris fugiat in et est tempor amet.Reprehenderit ut nostrud aliqua reprehenderit occaecat consequat dolore ex duis cillum sunt dolor est deserunt. Fugiat sunt cillum dolore Lorem eu sint sit consectetur aliqua laboris enim est veniam id. Sunt minim ad dolore dolore. Aliquip dolore sit irure elit consectetur.";

const aboutContent =
  "Reprehenderit ut nostrud aliqua reprehenderit occaecat consequat dolore ex duis cillum sunt dolor est deserunt. Fugiat sunt cillum dolore Lorem eu sint sit consectetur aliqua laboris enim est veniam id. Sunt minim ad dolore dolore. Aliquip dolore sit irure elit consectetur. Reprehenderit ut nostrud aliqua reprehenderit occaecat consequat dolore ex duis cillum sunt dolor est deserunt. Fugiat sunt cillum dolore Lorem eu sint sit consectetur aliqua laboris enim est veniam id. Sunt minim ad dolore dolore. Aliquip dolore sit irure elit consectetur.";

const contactContent =
  "Est sunt reprehenderit consequat anim sint in deserunt non enim aliquip esse est. Qui nisi laborum reprehenderit dolore deserunt veniam occaecat proident. Laboris excepteur est commodo in ullamco qui nostrud ut. Elit id laborum excepteur officia proident proident nulla.Reprehenderit ut nostrud aliqua reprehenderit occaecat consequat dolore ex duis cillum sunt dolor est deserunt. Fugiat sunt cillum dolore Lorem eu sint sit consectetur aliqua laboris enim est veniam id. Sunt minim ad dolore dolore. Aliquip dolore sit irure elit consectetur.";

const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

const postSchema = {
  title: String,
  body: String
};
const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function(err, foundposts){
    if (!err){
      res.render("home", { hsc: homeStartingContent, array: foundposts });
    }
  });
});

app.get("/posts/:postid", function (req, res) {
  const postid = req.params.postid;
  Post.findOne({_id: postid}, function(err, p){
    if (!err){
      res.render("post", { title: p.title, body: p.body });
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", { ac: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { cc: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.posttitle,
    body: req.body.postbody,
  });
  post.save();
  res.redirect("/");
});

app.listen(2000, function () {
  console.log("server started at port 2000");
});
