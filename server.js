const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const FILE = "posts.json";

// Get all posts
app.get("/posts", (req, res) => {
  const data = fs.readFileSync(FILE);

  res.json(JSON.parse(data));
});

// Add new post
app.post("/posts", (req, res) => {
  const newPost = req.body;

  const data = fs.readFileSync(FILE);

  const posts = JSON.parse(data);

  posts.push(newPost);

  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));

  res.json({
    message: "Post Added",
  });
});

// Update post
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;

  const updatedPost = req.body;

  const data = fs.readFileSync(FILE);

  const posts = JSON.parse(data);

  posts[id] = updatedPost;

  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));

  res.json({
    message: "Post Updated",
  });
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;

  const data = fs.readFileSync(FILE);

  let posts = JSON.parse(data);

  posts.splice(id, 1);

  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));

  res.json({
    message: "Post Deleted",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
