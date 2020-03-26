const express = require("express");
const authentication = require("./middleware/auth");
const getUser = require("./middleware/getUser");
const browser = require("./middleware/browserDetect");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
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

if (!process.env.jwtPrivateKey) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));

app.use(browser);
app.use(getUser);

app.use("/zeltlager", zeltlager);
app.use("/registration", registrations);
app.use("/users", users);
app.use("/auth", auth);
app.use("/forms", forms);

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
