const express = require("express");
const cors = require("cors");
const mongooseMorgan = require("mongoose-morgan");
const bodyParser = require("body-parser");
const db = require("./Models/index");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  mongooseMorgan({
    connectionString: db.url,
  })
);

const Role = require("./Models/Role.Model");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database Successfully!");
    initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

function initial() {
  Role.collection.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const roles = [
        new Role({
          name: "SuperAdmin",
        }),
        new Role({
          name: "Company",
        }),
        new Role({
          name: "Parking",
        }),
      ];

      Promise.all(roles.map((role) => role.save()))
        .then(() => {
          console.log("Added roles to collection");
        })
        .catch((err) => {
          console.error("Error adding roles to collection", err);
        });
    }
  });
}

require("./Routes/Auth.Route")(app);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to iPark server");
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
