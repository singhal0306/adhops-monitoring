require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const sessionParser = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect(process.env.mongoUrl);

const userRoute = require("./routes/userRoute");
const mobAvenueRoute = require("./routes/mobAvenueRoute")
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const port = process.env.port || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(
  sessionParser({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 3,
    },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connection.on("connected", ()  => {
  console.log("Connected to MongoDB SuccessFully!");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
app.use("/api/user", userRoute);
app.use('/api/mobavenue', mobAvenueRoute)

app.use(errorHandler);

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server is up and running on port: ${port}`);
});