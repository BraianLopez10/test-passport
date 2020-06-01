const app = require("./src/app");

app.listen(process.env.PORT_SERVER || 4000, (err) => {
  if (err) console.log("Error");

  console.log(
    "Server corriendo en el puerto ",
    process.env.PORT_SERVER || 4000
  );
});
