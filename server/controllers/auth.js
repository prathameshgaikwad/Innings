const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const User = require("../models/user.js");
const Player = require("../models/player.js");
const fetchRandomImage = require("../helpers/fetchRandomImage.js");
const fetchGoogleUserData = require("../helpers/fetchGoogleUserData.js");
const { generateCleanString } = require("../helpers/generateCleanString.js");

const register = async (req, res) => {
  try {
    let newUser;
    let { access_token, first_name, last_name, email, password } = req.body;
    // USE GOOGLE OAUTH IF PROVIDED ACCESS TOKEN
    if (access_token) {
      const googleUserData = await fetchGoogleUserData(access_token);
      if (!googleUserData) {
        throw new Error("Failed to fetch user data from Google.");
      }
      newUser = new User({
        first_name: generateCleanString(googleUserData.given_name),
        last_name: generateCleanString(googleUserData.family_name),
        email: googleUserData.email,
        profile_image_url: googleUserData.picture,
      });
    } else {
      // ELSE GO FOR REGULAR USER REGISTRATION
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      password = hashedPassword;
      newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        profile_image_url: await fetchRandomImage("person", false),
      });
    }
    //CREATE A NEW PLAYER INSTANCE AND LINK IT WITH THE NEWLY CREATED USER ACCOUNT
    const newPlayer = new Player({
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      debut: new Date(),
    });

    const savedPlayer = await newPlayer.save();
    newUser.player_id = savedPlayer._id;

    const savedUser = await newUser.save();
    res.status(StatusCodes.CREATED).json(savedUser);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    let user;
    let { access_token, email, password } = req.body;
    if (access_token) {
      // USE GOOGLE OAUTH IF PROVIDED ACCESS TOKEN
      const googleUserData = await fetchGoogleUserData(access_token);
      if (!googleUserData) {
        throw new Error("Failed to fetch user data from Google.");
      }

      user = await User.findOne({ email: googleUserData.email });
      if (!user) {
        user = new User({
          first_name: generateCleanString(googleUserData.given_name),
          last_name: generateCleanString(googleUserData.family_name),
          email: googleUserData.email,
          profile_image_url: googleUserData.picture,
        });
        await user.save();
      }
    } else {
      // ELSE GO FOR REGULAR LOGIN
      user = await User.findOne({ email });
      if (!user)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "User does not exist!" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid credentails." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    delete user.password;
    res.status(StatusCodes.OK).json({ token, user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
