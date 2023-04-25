// User interactions with db for login, logout, signup
const express = require("express");
const router = require("express").Router();
const { Bloggers } = require("../../models");

// signup
router.post("/signup", async (req, res) => {
  try {
    const newUser = await Bloggers.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

       res
         .status(200)
         .json({ message: "New user created successfully!", newUser });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await Bloggers.findOne({
      where: { email: req.body.email },
    });
    const validPassword = await userData.checkPassword(req.body.password);
    if (!userData || !validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // Create a session for the user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      console.log("Session data:", req.session);

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;