const jwt = require("jsonwebtoken");
const passport = require("passport");
const moment = require("moment");

const login = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }

    const payload = {
      sub: user._id,
      exp: moment().add(30, "minutes").unix(),
      username: user.username,
    };

    let token = jwt.sign(JSON.stringify(payload), process.env.TOKENSECRET);

    res.status(200).json({
      data: {
        token,
      },
    });
  })(req, res);
};
const loginFacebook = (req, res) => {
  passport.authenticate(
    "facebook",
    {
      session: false,
    },
    function (err, user, info) {
      if (err) return res.status(500).send();
      const payload = {
        sub: user._id,
        exp: moment.now(),
        username: user.username,
      };

      let token = jwt.sign(JSON.stringify(payload), process.env.TOKENSECRET);

      res.status(200).json({
        data: {
          token,
        },
      });
    }
  )(req, res);
};

module.exports = { login, loginFacebook };
