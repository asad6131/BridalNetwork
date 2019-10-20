const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Contact = require("../../models/Contacts");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));


router.post("/deleteContact", (req, res) => {
  Contact.findByIdAndRemove(req.body.id._id, (err, contact) => {
    if (err) return res.status(400).json({});
    return res.status(200).json({ success: true });
  });

});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email.toLowerCase() }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email.toLowerCase(), {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email.toLowerCase(),
        user_type: "3",
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
router.post("/admin_register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email.toLowerCase() }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email.toLowerCase(), {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email.toLowerCase(),
        user_type: "2",
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  if (req.body && req.body.password && req.body.email) {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // Find user by email
    User.findOne({ email, user_type: "3" }).then(user => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar,
            user_type: user.user_type
          }; // Create JWT Payload
          // console.log(payload);
          // return;
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 360000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  } else if (req.body && !isEmpty(req.body.email) && !isEmpty(req.body.provider) && !isEmpty(req.body.provider_id)) {
    let errors = {};
    const email = req.body.email.toLowerCase();

    // Find user by email
    User.findOne({ email, user_type: "3" }).then(user => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      } else {
        const payload = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
          user_type: user.user_type
        }; // Create JWT Payload

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 360000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
    });
  } else {
    let errors = {};
    errors.password = "Password incorrect";
    return res.status(400).json(errors);
  }
});

router.post("/vendorlogin", (req, res) => {
  // console.log(req.body);
  if (req.body && req.body.password && req.body.email) {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // Find user by email
    User.findOne({ email, user_type: "2" }).then(user => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar,
            user_type: user.user_type
          }; // Create JWT Payload
          // console.log(payload);
          // return;
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 360000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });

  } else if (req.body && !isEmpty(req.body.email) && !isEmpty(req.body.provider) && !isEmpty(req.body.provider_id)) {
    let errors = {};
    const email = req.body.email.toLowerCase();

    // Find user by email
    User.findOne({ email, user_type: "2" }).then(user => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      } else {
        const payload = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
          user_type: user.user_type
        }; // Create JWT Payload

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 360000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
    });
  } else {
    let errors = {};
    errors.password = "Password incorrect";
    return res.status(400).json(errors);
  }
});

router.post("/adminlogin", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  // Find user by email
  User.findOne({ email, user_type: "1" }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
          user_type: user.user_type
        }; // Create JWT Payload
        // console.log(payload);
        // return;
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 360000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.post(
  "/changepassword/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    let isValid = true;

    if (isEmpty(req.body.user_id)) {
      isValid = false;
      errors.password = "There was error is change the password.";
    }

    if (isEmpty(req.body.password)) {
      isValid = false;
      errors.password = "Enter the old password.";
    }

    if (isEmpty(req.body.npassword)) {
      isValid = false;
      errors.npassword = "Enter the new password.";
    }

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user_id = req.body.user_id;
    const password = req.body.password;
    const npassword = req.body.npassword;

    console.log(req.body);

    // Find user by email
    User.findOne({ _id: user_id }).then(user => {
      // Check for user
      if (!user) {
        errors.password = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const data = {
            password: npassword
          };

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data.password, salt, (err, hash) => {
              if (err) throw err;
              data.password = hash;
              User.findOneAndUpdate(
                { _id: user_id },
                { $set: data },
                { new: true }
              )
                .then(user => {
                  // console.log(user);
                  res.json(user);
                })
                .catch(err => {
                  errors.password =
                    "There was some error in changing the password.";
                  res.status(404).json(errors);
                });
            });
          });
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  }
);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      user_type: req.user.user_type,
      email: req.user.email.toLowerCase()
    });
  }
);
router.get(
  "/contacts/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Contact.find({ user: req.user.id })
      .populate("user")
      .populate("friend")
      .then(users => {
        if (!users) {
          res.json([]);
        }
        // console.log(users);
        res.json(users);
      })
      .catch(err => res.json([]));
  }
);
router.get(
  "/checkreceiver/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.params.user_id);
    User.findOne({ _id: req.params.user_id })
      .then(user => {
        if (!user) {
          res.json([]);
        }

        Contact.findOne({ user: req.user.id, friend: req.params.user_id })
          .then(contact => {
            if (!contact) {
              const contactUser = new Contact({
                user: req.user.id,
                friend: req.params.user_id
              });
              contactUser
                .save()
                .then(user => {
                  Contact.findOne({
                    friend: req.user.id,
                    user: req.params.user_id
                  })
                    .then(contact2 => {
                      if (!contact2) {
                        const contactUser2 = new Contact({
                          friend: req.user.id,
                          user: req.params.user_id
                        });
                        contactUser2
                          .save()
                          .then(user => res.json(user))
                          .catch(err => console.log(err));
                      }

                      res.json(contact2);
                    })
                    .catch(err =>
                      res.status(404).json({ notfound: "There is no user" })
                    );
                })
                .catch(err => console.log(err));
            }
            res.json(contact);
          })
          .catch(err => res.status(404).json({ notfound: "There is no user" }));
      })
      .catch(err => res.status(404).json({ notfound: "There is no user" }));
  }
);

module.exports = router;
