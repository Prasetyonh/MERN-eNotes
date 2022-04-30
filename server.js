require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

//connect to mongoose
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB is connected");
  }
);

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client/build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Listen Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
