const { Op } = require("sequelize");
const { Chat, User } = require("../models/schema");

module.exports = {
  async sendMessage(req, res) {
    const result = await Chat.create(req.body);

    res.send(result);
  },
  async getMessages(req, res) {
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [
          {
            sender_id: req.body.id,
            receiver_id: req.body.fid,
          },
          {
            sender_id: req.body.fid,
            receiver_id: req.body.id,
          },
        ],
      },
      include: [
        {
          model: User,
          as: "sender",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
        {
          model: User,
          as: "receiver",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send(chats);
  },
  //TODO: implimentation
  async deleteMessege(req, res) {},
  async editMessege(req, res) {},
};
