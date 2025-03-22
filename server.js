const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Blog Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

// Home Route - Show all posts
app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("index", { posts: posts });
});

// Create Post Route
app.get("/new", (req, res) => {
  res.render("new");
});

// Save New Post
app.post("/new", async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  await newPost.save();
  res.redirect("/");
});

// View Post
app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", { post: post });
});

// Start Server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

