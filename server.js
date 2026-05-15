const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const FILE = "posts.json";

// Get all blog posts
app.get("/posts", (req, res) => {
  const data = fs.readFileSync(FILE);
  res.json(JSON.parse(data));
});

// Add new blog post
app.post("/posts", (req, res) => {
  const newPost = req.body;

  const data = fs.readFileSync(FILE);
  const posts = JSON.parse(data);

  posts.push(newPost);

  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));

  res.json({
    message: "Post Added Successfully",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
