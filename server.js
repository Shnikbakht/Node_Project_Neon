const express = require("express");
const app = express();
const methodOverride = require("method-override");

global.config = require("./config");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use("/user", require("./routes/user"));
app.set("view engine", "ejs");


app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
