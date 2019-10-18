const express = require("express");
const path = require("path");
const authentication = require("./middleware/auth");
const getUser = require("./middleware/getUser");
const browser = require("./middleware/browserDetect");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const mustacheExpress = require("mustache-express");
const registrations = require("./routes/registrations");
const forms = require("./routes/forms");
const users = require("./routes/users");
const auth = require("./routes/auth");
const zeltlager = require("./routes/zeltlager");
const cors = require("cors");

const app = express();
app.use(cors());

console.log("Application Name: " + config.get("name"));
console.log("Mail Server " + config.get("mail.host"));

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect(config.get("database"), { useNewUrlParser: true })
  .then(() => console.log("connected to MongoDB..."))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));

app.use(browser);
app.use(getUser);

app.use("/api/zeltlager", zeltlager);
app.use("/api/registration", registrations);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/question", forms);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
