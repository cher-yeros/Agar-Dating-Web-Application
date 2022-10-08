const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const PostController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");
const { Post, Advertise, Coupled, User } = require("../models/schema");
const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/add", upload.single("photo"), async (req, res, next) => {
  const photo = req.file.filename;
  req.body.image = photo;

  const post = await Post.create(req.body);

  res.send(post);
});
router.get("/get-posts", authMiddleware, PostController.getPosts);
router.delete("/delete-post", authMiddleware, PostController.deletePost);
router.post("/store-feedback", authMiddleware, PostController.storeFeedback);
router.get("/get-feedback", authMiddleware, PostController.getFeedback);

var uploadAd = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/ad", uploadAd.single("photo"), async (req, res, next) => {
  const photo = req.file.filename;
  req.body.photo = photo;

  const post = await Advertise.create(req.body);

  res.send({
    success: true,
  });
});

router.get("/ads", authMiddleware, PostController.getAds);
router.get("/rposts", authMiddleware, async (req, res) => {
  const rships = await Coupled.findAll({
    //include: [{ model: User, as: "user" }, { model: User, as: "partner" }, ,],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["avatar", "firstname", "lastname"],
      },
      {
        model: User,
        as: "partner",
        attributes: ["avatar", "firstname", "lastname"],
      },
    ],
  });
  res.send({ posts: rships });
});

module.exports = router;
