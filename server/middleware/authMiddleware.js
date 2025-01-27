const User = require("../modals/userModal");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    const verified = jwt.verify(token, process.env.jwtSecret);
    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };
