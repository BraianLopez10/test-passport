const app = require("./src/app");

app.listen(process.env.PORT_SERVER || 4000, (err) => {
  if (err) console.log("Error");

  console.log("server on port ", process.env.PORT_SERVER || 4000);
});
