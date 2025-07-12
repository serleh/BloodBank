const bcrypt = require("bcrypt");
const Donor = require("../models/Donor");
module.exports = {
  getRegister: (req, res) => {
    res.render("register.ejs");
  },
  register: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        city,
        weight,
        gender,
        bloodGroup,
        contactNumber,
        dateOfBirth,
      } = req.body;

      // Check if a Donor exist
      const existingDonor = await Donor.findOne({ email });
      if (existingDonor) {
        return res.send("Email already registered");
      }
      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);
      await Donor.create({
        name,
        email,
        password: hashedPassword,
        city,
        weight,
        gender,
        bloodGroup,
        contactNumber,
        dateOfBirth,
      });
      console.log("Account created");

      res.redirect("/donors/profile");
    } catch (err) {
      console.error(err);
      res.status(500).send("Registration failed");
    }
  },
  getLogin: (req, res) => {
    res.render("login.ejs");
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const donor = await Donor.findOne({ email });
      const validDonor = await bcrypt.compare(password, donor.password);

      // Check if both fields are sent
      if (!email || !password) {
        return res.status(400).send("Email and password are required");
      }

      if (validDonor) {
        req.session.donorId = donor._id;
        return res.redirect("/donors/profile");
      }
      res.redirect("/login");
    } catch (err) {
      console.error(err);
    }
  },
  logout: (req, res) => {
    req.session.donorId = null;
    res.redirect("/");
  },
};
