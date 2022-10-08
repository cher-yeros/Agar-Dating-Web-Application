const { Op } = require("sequelize");
const {
  MatchCriteria,
  User,
  Matched,
  Suggestion,
  Coupled,
} = require("../models/schema");

module.exports = {
  async addMatchCriteria(req, res) {
    const criteria = await MatchCriteria.create(req.body);
    res.send({
      criteria,
    });
  },
  async createSuggestion(req, res) {
    const criteria = await MatchCriteria.findOne({
      where: {
        UserId: req.body.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
    });

    if (!criteria) {
      res.send({
        success: false,
        error: "Please Add Criteria First",
      });
    } else {
      const { hStart, hEnd } = criteria;
      const { wStart, wEnd } = criteria;
      const { aStart, aEnd } = criteria;
      console.log(aStart, aEnd);

      const users = await User.findAll({
        where: {
          [Op.and]: {
            active: true,
            [Op.or]: {
              height: {
                [Op.between]: [hStart, hEnd],
              },
            },
            [Op.or]: {
              weight: {
                [Op.between]: [wStart, wEnd],
              },
            },
          },
          [Op.or]: {
            age: {
              [Op.between]: [aStart, aEnd],
            },
          },
        },
        //include: {
        //    as: 'sender',
        //    model: Request
        //},
        attributes: ["id"],
      });
      users.forEach(async (user) => {
        const sggsn = await Suggestion.findOne({
          where: {
            user_id: req.body.id,
            suggested_id: user.id,
            //firstname: user.firstname,
            //lastname: user.lastname,
            //username: user.username,
          },
        });
        if (!sggsn) {
          await Suggestion.create({
            user_id: req.body.id,
            suggested_id: user.id,
          });
        }
      });

      res.send({
        success: true,
      });
    }

    //TODO : calculate virtual datatype age
  },
  async getSuggestion(req, res) {
    const hasRship = await User.findOne({
      where: {
        [Op.or]: {
          user_id: req.body.id,
          partner_id: req.body.id,
        },
      },
    });
    if (hasRship) {
      res.send({
        success: false,
        message: "You can't get suggestion you have reltionship!",
      });
    } else {
      const q = req.query.q;
      if (q) {
        const suggestions = await Suggestion.findAll({
          where: {
            user_id: req.body.id,
            requested: false,
            //[Op.or]: {
            //  firstname: {
            //    [Op.like]: `%${q}%`,
            //  },
            //  lastname: {
            //    [Op.like]: `%${q}%`,
            //  },
            //  username: {
            //    [Op.like]: `%${q}%`,
            //  },
            //},
          },
          include: [
            {
              as: "suggested",
              model: User,
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "user_id"],
          },
        });

        res.send(suggestions);
      } else {
        const suggestions = await Suggestion.findAll({
          where: {
            user_id: req.body.id,
            requested: false,
          },
          include: [
            {
              as: "suggested",
              model: User,
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "user_id"],
          },
        });

        res.send(suggestions);
      }
    }
  },
  async getMatches(req, res) {
    const q = req.query.q;
    if (q) {
      const matches = await Matched.findAll({
        where: {
          user_id: req.body.id,
          requested: false,
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
        include: {
          as: "partner",
          model: User,
        },
      });

      res.send(matches);
    } else {
      try {
        const matches = await Matched.findAll({
          where: {
            user_id: req.body.id,
            requested: false,
          },
          include: {
            as: "partner",
            model: User,
          },
        });
        res.send(matches);
      } catch (error) {
        res.send({ success: false, message: "Server Error" });
      }
    }
  },
  async getMyPartner(req, res) {
    const partner = await Coupled.findOne({
      where: {
        user_id: req.body.id,
      },
      include: {
        as: "partner",
        model: User,
      },
      order: [["createdAt", "DESC"]],
    });

    res.send(partner.partner);
  },
};
