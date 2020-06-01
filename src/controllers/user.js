const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

const create = async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;

  if (!username || !name || !password) return res.status(500).send();

  return UserModel.findOne({ username }).then((data) => {
    if (data) return res.status(400).json({ message: "Usuario ya existe" });

    let hash = bcrypt.hashSync(password, 10);
    const user = {
      username,
      name,
      password: hash,
    };
    UserModel.create(user).then((userCreated) => {
      return res.status(200).json(userCreated);
    });
  });
};

module.exports = { create };
