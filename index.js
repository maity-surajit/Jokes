const express = require("express");
const { connectMongoDB } = require("./connection.js");
const { logReqRes } = require("./middleware");
const userRouter = require("./routes/user.js");

const app = express();
const PORT = 8000;

//db connection
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1").then(() => {
  console.log("MongoDB connected...");
});

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

app.get("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
