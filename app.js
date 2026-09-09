const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");

const postRoutes = require("./routes/post.routes");

const commentRoutes = require("./routes/comment.routes");

const userRoutes = require("./routes/user.routes");

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/posts", commentRoutes);

app.use("/api", commentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Blog API is running",
  });
});

module.exports = app;