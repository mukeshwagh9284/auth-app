require("dotenv").config();
// const { response } = require("express");
const UserModule = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendResetEmail = (email, token) => {
  const resetLink = `https://auth-app-ui-murex.vercel.app/reset-password/${token}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Click this link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const addUser = async (req, res) => {
  try {
    const { email, password, fname } = req.body;
    // if (password !== confirmPassword) {
    //   return res.status(400).json({
    //     message: "Passwords do not match.",
    //     success: false,
    //   });
    // }
    const userData = await UserModule.findOne({ email });
    if (userData) {
      return res.status(409).json({
        message: "user is already exist,you can login",
        success: false,
      });
    }
    const newUser = new UserModule({
      fname,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const data = await newUser.save();
    res.status(200).send({ msg: "data save successfully", data });
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModule.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successfully",
      success: true,
      jwtToken,
      email,
      fname: user.fname,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModule.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    sendResetEmail(email, token);
    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset email", error });
  }
};
const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModule.findByIdAndUpdate(decoded._id, {
      password: hashedPassword,
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token", error });
  }
};

module.exports = { addUser, loginUser, requestPasswordReset, resetPassword };
