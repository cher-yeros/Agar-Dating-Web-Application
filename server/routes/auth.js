const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const AuthController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { User } = require("../models/schema");

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

router.post("/login", AuthController.login);
router.post("/admin-login", AuthController.adminLogin);
//router.post('/logout', AuthController.logout)
router.post("/register", AuthController.createAccount);
router.post("/admin-register", AuthController.adminRegister);
router.put("/edit-profile", authMiddleware, AuthController.editProfile);
router.post("/reset-password", AuthController.resetPassword);
//router.post("/reset-password", AuthController.resetPassword);
router.post("/change-password", AuthController.changePassword);

router.post(
  "/change-profile",
  upload.single("profileImg"),
  async (req, res, next) => {
    const avatar = req.file.filename;

    const update = await User.update(
      { avatar },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.send(avatar);
  }
);

module.exports = router;
