const crypto = require("crypto");
const { User, Request, MatchCriteria, Matched } = require("../models/schema");
const { Op, Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = {
  async getOnlineContact(req, res) {
    const q = req.query.q;

    if (q) {
      const users = await User.findAll({
        where: {
          [Op.and]: {
            active: true,
            login_status: 1,
            [Op.or]: {
              firstname: {
                [Op.like]: `%${q}%`,
              },
              lastname: {
                [Op.like]: `%${q}%`,
              },
              username: {
                [Op.like]: `%${q}%`,
              },
            },
          },
        },
        attributes: {
          exclude: ["password", "socketId", "createdAt", "updatedAt"],
        },
      });

      res.send(users);
    } else {
      const users = await User.findAll({
        where: {
          active: true,
          login_status: 1,
          age: 8,
        },
        attributes: {
          exclude: ["password", "socketId", "createdAt", "updatedAt"],
        },
      });

      res.send(users);
    }
  },
  async getUsers(req, res) {
    const q = req.query.q;
    if (q) {
      const users = await User.findAll({
        where: {
          [Op.or]: {
            firstname: {
              [Op.like]: `%${q}%`,
            },
            lastname: {
              [Op.like]: `%${q}%`,
            },
            username: {
              [Op.like]: `%${q}%`,
            },
          },
        },
        attributes: {
          exclude: ["password", "socketId", "createdAt", "updatedAt"],
        },
      });

      res.send(users);
    } else {
      const users = await User.findAll({
        //attributes: { exclude: ['password', 'socketId','createdAt','updatedAt'] }
      });

      res.send(users);
      //console.log(users);
    }
  },
  async myFriends(req, res) {
    const q = req.query.q;

    if (q) {
      const friends = await Matched.findAll({
        where: {
          [Op.and]: {
            user_id: req.body.id,
            [Op.or]: {
              firstname: {
                [Op.like]: `%${q}%`,
              },
              lastname: {
                [Op.like]: `%${q}%`,
              },
              username: {
                [Op.like]: `%${q}%`,
              },
            },
          },
        },
        include: [
          {
            as: "partner",
            model: User,
          },
        ],
        attributes: {
          exclude: ["password", "socketId", "createdAt", "updatedAt"],
        },
      });

      res.send(friends);
    } else {
      const friends = await Matched.findAll({
        where: {
          user_id: req.body.id,
        },
        include: [
          {
            as: "partner",
            model: User,
          },
        ],
        attributes: {
          exclude: ["password", "socketId", "createdAt", "updatedAt"],
        },
      });

      res.send(friends);
    }
  },
  async nearbyPeople(req, res) {
    const inMiles = 3963.0;
    const inKMs = 6371.8;

    const { latitude, longitude, gender } = req.body;
    const distance = 1;

    const calculateDistance = `(
            ${inKMs} * acos(
                cos(radians(${latitude}))
                * cos(radians(latitude))
                * cos(radians(longitude) - radians(${longitude}))
                + sin(radians(${latitude})) * sin(radians(latitude))
            )
        )`;

    const q = req.query.q;

    if (q) {
      const users = await User.findAll({
        where: {
          active: true,
          [Op.not]: {
            gender: gender,
          },
          [Op.or]: {
            firstname: {
              [Op.like]: `%${q}%`,
            },
            lastname: {
              [Op.like]: `%${q}%`,
            },
            username: {
              [Op.like]: `%${q}%`,
            },
          },
        },
        attributes: {
          include: [[Sequelize.literal(calculateDistance), "distance"]],
          exclude: [
            "password",
            "socketId",
            "login_status",
            "createdAt",
            "updatedAt",
          ],
        },
        order: Sequelize.col("distance"),
      });

      res.send(users);
    } else {
      const users = await User.findAll({
        where: {
          active: true,
          [Op.not]: {
            gender: gender,
          },
        },
        attributes: {
          include: [[Sequelize.literal(calculateDistance), "distance"]],
          exclude: [
            "password",
            "socketId",
            "login_status",
            "createdAt",
            "updatedAt",
          ],
        },
        order: Sequelize.col("distance"),
        //limit: req.body.number || 11
      });

      res.send(users);
    }
  },
  async deleteUser(req, res) {
    const destroy = await User.destroy({
      where: {
        id: req.body.id,
      },
    });

    res.send({
      destroy,
    });
  },
};
