const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");

const port = process.env.PORT || 4000;

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

app.get("/", (req, res) => {
  res.send("hello");
});

require("./routes/employee.routes")(app);

app.listen(port, () => {
  console.log("server is running on port ", port);
});
