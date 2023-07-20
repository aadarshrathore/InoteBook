const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// creating Besides incorporating a salt to protect against rainbow table attacks, bcrypt is an adaptive function
const bcrypt = require("bcryptjs");
//
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

// jwt create client and server good communication means create layer of authentication
const JWR_SECRET = "aadarshisgoodb$oy";

//ROUTE:1 create a user using: Post "/api/auth/createuser".no login required
router.post(
  "/createuser",
  [
    body("name", "Enter Valide Name"),
    body("email", "Enter Valide Email").isEmail(),
    body("password", "Enter Atleast more than 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // if the errors return bad errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // check whether User email exists
      let user = await User.findOne({ success, email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      // Inserting Password layer with hash and salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create new user
      user = await User.create({
        name: req.body.username,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      // sending Token to user
      const authToken = jwt.sign(data, JWR_SECRET);

      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal error Occured");
    }
    // .then((user)=>{res.json(user)}).catch(err=>{console.log(err)})
    // res.json({error: 'Please enter unique email', message: 'Duplicate email'})
  }
);

//ROUTE:2 create a user using: Post "/api/auth/login".no login required
router.post(
  "/login",
  [
    body("email", "Enter Valide Email").isEmail(),
    body("password", "Enter Password").exists(),
  ],
  async (req, res) => {
    // if the errors return bad errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please Enter right Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        let success = false;
        return res
          .status(400)
          .json({ success, error: "Please Enter right Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      // sending Token to user
      const authToken = jwt.sign(data, JWR_SECRET);
      let success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal error Occured");
    }
  }
);

//ROUTE:3 GET LOggined: Post "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error Occured");
  }
});
module.exports = router;
