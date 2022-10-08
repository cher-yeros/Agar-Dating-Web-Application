const { User, Admin } = require("../models/schema");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
require("dotenv").config();
const bcrypt = require("bcryptjs");

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;

    const admin = await Admin.findOne({
      where: {
        [Op.and]: {
          username: username,
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const user = await User.findOne({
      where: {
        [Op.and]: {
          username: username,
        },
      },
      attributes: {
        exclude: ["socketId", "createdAt", "updatedAt"],
      },
    });

    if (admin) {
      const pwdCorrect = await bcrypt.compare(password, admin.password);

      if (pwdCorrect) {
        const auth = admin.dataValues;
        delete auth.password;

        auth.isAdmin = true;
        jwt.sign(
          {
            auth: {
              id: auth.id,
              isAdmin: true,
              username: auth.username,
            },
          },
          process.env.SECRET_KEY,
          async function (err, token) {
            if (err) {
              res.send({
                success: false,
                error: err,
              });
            } else {
              auth.token = token;
              console.log(typeof auth.token);
              res.send({
                success: true,
                user: auth,
              });
            }
          }
        );
      } else {
        res.send({
          success: false,
          error: "Incorrect Password Entered!",
        });
      }
    } else if (user) {
      const { latitude, longitude } = req.body;

      const pwdCorrect = await bcrypt.compare(password, user.password);
      if (pwdCorrect) {
        const upUser = await user.update({
          latitude,
          longitude,
        });

        const auth = upUser.dataValues;
        delete auth.password;
        auth.isAdmin = false;

        jwt.sign(
          {
            auth: {
              id: auth.id,
              isAdmin: false,
              username: auth.username,
            },
          },
          process.env.SECRET_KEY,
          async function (err, token) {
            if (err) {
              res.send({
                success: false,
                error: err,
              });
            } else {
              auth.token = token;

              res.send({
                success: true,
                user: auth,
              });
            }
          }
        );
      } else {
        res.send({
          success: false,
          error: "Incorrect Password Entered!",
        });
      }
    } else {
      if (!user && !admin) {
        res.send({
          success: false,
          error: "User is not registered!",
        });
      }
    }
  },
  logout() {},
  async createAccount(req, res) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        req.body.password = hash;
        User.create(req.body).then((data) => {
          res.send({
            success: true,
            admin: data,
          });
        });
      });
    });
  },
  async editProfile(req, res) {
    const user = await User.update(req.body, {
      where: {
        id: req.body.id,
      },
    });

    res.send({
      success: user[0],
    });
  },
  async resetPassword(req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.send({
        success: false,
        message: "Incorrect email",
      });
    } else {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "yerosendiriba1892@gmail.com",
          pass: "lpmlkrddqntnssyv",
        },
      });

      const key = Math.floor(100000 + Math.random() * 900000);

      transporter.sendMail(
        {
          from: "yerosendiriba1892@gmail.com", // sender address
          to: "yerosendiriba1893@gmail.com", // list of receivers
          subject: "Reset Key for password", // Subject line
          text: "Key for password" + key, // plain text body
          html: "<h4>Password reset key</h4> <h1>" + key + "</h1>", // html body
        },
        function (error, info) {
          console.log(error, "error");
          if (error) {
            console.log("in");
            emailMessage =
              "there was an error :-(, and it was this: " + error.message;
            res.send({
              success: true,
              message: "Server error",
            });
          } else {
            emailMessage = "Message sent: " + info.response;
            console.log(emailMessage);
            res.send({
              success: true,
              key,
            });
          }
        }
      );
    }
  },
  async changePassword(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
      include: [Role],
    });

    if (!user) {
      res.send({
        success: false,
        message: "No user registered with this phone!",
      });
    } else {
      if (password.currentPassword) {
        const pwdCorrect = await bcrypt.compare(
          password.currentPassword,
          user.password
        );

        if (!pwdCorrect) {
          res.send({
            success: false,
            message: "Your have entered incorrect old password!",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password.newPassword, salt);

          const result = await User.update(
            {
              password: hash,
            },
            {
              where: {
                id: user.id,
              },
            }
          );

          console.log(result);

          res.send({
            success: result[0] ? true : false,
          });
        }
      }
    }
  },
  async adminLogin(req, res) {
    const { email, password } = req.body;
    const user = await Admin.findOne({
      where: {
        [Op.and]: {
          email: email,
        },
      },
      attributes: {
        exclude: ["socketId", "createdAt", "updatedAt"],
      },
    });

    if (!user) {
      res.send({
        error: "User is not registered!",
      });
    } else {
      const pwdCorrect = await bcrypt.compare(password, user.password);
      if (pwdCorrect) {
        jwt.sign({ user }, process.env.SECRET_KEY, async function (err, token) {
          if (err) {
            res.send(err);
          } else {
            var userJson = user.toJSON();

            userJson.token = token;
            res.send({
              user: userJson,
            });
          }
        });
      } else {
        res.send({
          success: false,
          error: "Incorrect password",
        });
      }
    }
  },
  async adminRegister(req, res) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        req.body.password = hash;
        Admin.create(req.body).then((data) => {
          res.send({
            success: true,
            admin: data,
          });
        });
      });
    });
  },
};
