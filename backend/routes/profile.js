const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Profile = require("../models/Profile");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Thi$!$@JWT";

//@route    POST api/createuser
//@desc     Register user
//@access   public
router.post(
  "/createuser",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, errors: [{ msg: "User already exists" }] });
      }
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = { id: user.id };
      const authtoken = jwt.sign(payload, JWT_SECRET);

      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//@route    POST api/login
//@desc     Login to profile
//@access   public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, errors: [{ msg: "Please use correct credentials" }] });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success: false, errors: [{ msg: "Please use correct credentials" }] });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//@route    POST api/createprofile
//@desc     Create profile
//@access   public
router.post(
  "/createprofile",
  fetchuser,
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("description").notEmpty().withMessage("Description is required"),
    check("designation").notEmpty().withMessage("Designation is required"),
    check("company").notEmpty().withMessage("Company is required"),
    check("address").notEmpty().withMessage("Address is required"),
  ],
  async (req, res) => {
    console.log("inside create profile route")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      description,
      designation,
      company,
      address,
      social,
      profilePicture,
    } = req.body;
    const userId = req.user.id;

    try {
      const profile = new Profile({
        user: userId,
        name,
        email,
        description,
        designation,
        company,
        address,
        social,
        profilePicture,
      });

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

//@route    PUT api/updateprofile/:id
//@desc     Update profile
//@access   public
router.put(
  "/updateprofile/:id",
  fetchuser,
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("description", "Description is required").not().isEmpty(),
    check("designation", "Designation is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      name,
      email,
      description,
      designation,
      company,
      address,
      social,
      profilePicture,
    } = req.body;

    try {
      const profile = await Profile.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name,
            email, 
            description,
            designation,
            company,
            address,
            social,
            profilePicture,
          },
        },
        { new: true }
      );

      if (!profile) {
        return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
      }

      res.json({ success: true, profile });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//@route    GET api/profile/:userId
//@desc     Show profile
//@access   public
router.get("/profile/:id", fetchuser, async (req, res) => {
  try {
    // const { userId } = req.params;
    // const profile = await Profile.findById({ user: userId }).populate("user", [
    //   "name",
    //   "email",
    // ]);
    const profile = await Profile.findById(req.params.id)

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/auth/getuser
//@desc     Get logged-in user details
//@access   Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
