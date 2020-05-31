const db = require("mongoose");

db.connect(
  "mongodb://127.0.0.1:27017/jwtpassport",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connect to the database");
  }
);

exports.module = db;
