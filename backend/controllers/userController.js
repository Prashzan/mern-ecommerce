const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @desc  Auth user and get token
//@route  POST /api/users/login
//@access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc  Register a new user
//@route  POST /api/users
//@access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Get user profile
//@route  GET /api/users/profile
//@access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user._id);

  if (loggedInUser) {
    res.json({
      _id: loggedInUser._id,
      name: loggedInUser.name,
      email: loggedInUser.email,
      isAdmin: loggedInUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  Update user profile
//@route  GET /api/users/profile
//@access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user._id);

  if (loggedInUser) {
    loggedInUser.name = req.body.name || loggedInUser.name;
    loggedInUser.email = req.body.email || loggedInUser.email;

    if (req.body.password) {
      loggedInUser.password = req.body.password;
    }

    const updatedUser = await loggedInUser.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { authUser, getUserProfile, registerUser, updateUserProfile };
