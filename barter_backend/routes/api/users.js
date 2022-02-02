const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// USer model
const User = require("../../models/User");

// Utils
const { getRandom } = require("../../helpers/utils");

// Post request for registrations

router.post("/", (req, res) => {
  const { name, email, phone, password, userRef } = req.body;

  // Validation
  if (!name || !email || !phone || !password) {
    return res
      .status(400)
      .json({ msg: "Please enter name, email, phone & password" });
  }

  //   Check if user exist
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "USer already exit" });

    const newUser = new User({
      name,
      email,
      phone,
      password,
      userRef,
      account_number: getRandom(11),
      account_balance: getRandom(5),
    });
    // console.log(newUser);
    //   Create salt using bcryptjs
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        // console.log(newUser);

        newUser.save().then((user)=> {
          jwt.sign(
            {id: user.id},
            config.get('bartersecret'),
            {expiresIn: 3600},
            (err, token) => {
              if (err) throw err;
              return res.status(200).json({
                token, 
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  account_balance: user.account_balance,
                  account_number: user.account_number,
                },
              })
            }
          )
        })
      });
    });
  });
});

module.exports = router;
