const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  listUser,
  updateUser
} = require("../controllers/userController");
const router = express.Router();

router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", protect, getUser);
// updateuser
router.get ("/update", protect, updateUser)
// deluser

router.post("/register", adminProtect, registerUser);
router.get("/listUser", adminProtect, listUser);
module.exports = router;
