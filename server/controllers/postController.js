const { Post, Feedback, User, Advertise } = require("../models/schema");

module.exports = {
  async storePost(req, res) {},
  async getPosts(req, res) {
    const posts = await Post.findAll({
      where: {
        UserId: req.query.id,
      },
      order: [["createdAt", "DESC"]],
    });

    res.send(posts);
  },
  async deletePost(req, res) {
    const deleted = await Post.destroy({
      where: {
        id: req.query.id,
      },
    });

    res.send({ success: deleted });
  },
  async storeFeedback(req, res) {
    const fb = await Feedback.create(req.body);

    res.send(fb);
  },
  async getFeedback(req, res) {
    const feedbacks = await Feedback.findAll({
      include: User,
    });

    res.send(feedbacks);
  },
  async getAds(req, res) {
    const noAds = await Advertise.findAll();

    res.send(noAds);
  },
};
