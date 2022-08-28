const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const healthCheck = require("./controllers/health");
const userPost = require("./controllers/user_post");
const doubtPost = require("./controllers/doubt_post");
const doubtGet = require("./controllers/doubt_get");
const assistantPost = require("./controllers/assistant_post");
const assistantGet = require("./controllers/assistant_get");
const updateDoubt = require("./controllers/doubt_update");
const doubtForTA = require("./controllers/doubtforta_get");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB 📦");
  }
);

app.get("/health", healthCheck);

app.post("/user", userPost);

app.post("/doubt", doubtPost);

app.get("/doubts", doubtGet);

app.get("/doubtsforta/:email", doubtForTA);

app.post("/assistant", assistantPost);

app.get("/assistants", assistantGet);

app.post("/updatedoubt", updateDoubt);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🚀`);
});
