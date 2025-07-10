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

      res.redirect("/login");
    } catch (err) {
      console.error(err);
      res.status(500).send("Registration failed");
    }
  },
};
