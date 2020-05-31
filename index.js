const app = require("./src/app");

app.listen(4000, (err) => {
  if (err) console.log("Error");

  console.log("Server corriendo en el puerto 4000");
});
