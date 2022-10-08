const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { User, Matched, Coupled } = require("../models/schema");

router.get("/online-contacts", authMiddleware, UserController.getOnlineContact);
router.get("/all", authMiddleware, UserController.getUsers);
router.post("/my-friends", authMiddleware, UserController.myFriends);
router.post("/nearby", authMiddleware, UserController.nearbyPeople);
router.delete("/delete", authMiddleware, UserController.deleteUser);
router.post("/activate", authMiddleware, async (req, res) => {
  const user = await User.update(
    {
      active: true,
    },
    { where: { id: req.body.id } }
  );

  res.send({ success: true });
});
router.post("/deactivate", authMiddleware, async (req, res) => {
  const user = await User.update(
    {
      active: false,
    },
    { where: { id: req.body.id } }
  );

  res.send({ success: true });
});
router.get("/counts", authMiddleware, async (req, res) => {
  try {
    const users = await User.count();
    const matchs = (await Matched.count()) / 2;
    const relashionships = (await Coupled.count()) / 2;
    res.send({ users, matchs, relashionships });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
