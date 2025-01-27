const User = require("../modals/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const genToken = (id) => {
  return jwt.sign({ id }, process.env.jwtSecret, { expiresIn: "3d" });
};

const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, selectedRole } = req.body;
    const name = firstName + " " + lastName;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide all the information!");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("Minimum password length is 6");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already Exist");
    }
    const user = await User.create({
      name,
      email,
      password,
      role: selectedRole,
    });

    if (user) {
      res.status(200).json({
        message: "User Register Successfully",
      });
    } else {
      res.status(400);
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, remember } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide both Email and Password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (user && matchPassword) {
      const token = genToken(user._id);
      var expires;
      if (remember) {
        expires = new Date(Date.now() + 1000 * 86400 * 30); // 30 days
      } else {
        expires = new Date(Date.now() + 1000 * 3600); // 1hr
      }
      res.cookie("jwt", token, {
        httpOnly: true,
        expires: expires,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({ message: "User Logged In Successfully" });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) =>{
    console.log(req.body)
}
 
const listUser = async (req, res, next) => {
  try {
    const result = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User Logged Out Successfully" });
};

module.exports = { registerUser, loginUser, logoutUser, getUser, listUser, updateUser };
