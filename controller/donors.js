const Donor = require("../models/Donor");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const donor = await Donor.findById(req.session.donorId);
      res.render("profile.ejs", { donor });
    } catch (err) {
      console.error(err);
    }
  },
  getUpdateProfile: async (req, res) => {
    try {
      const donor = await Donor.findById(req.session.donorId);
      res.render("editProfile.ejs", { donor });
    } catch (err) {
      console.error(err);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { name, city, contactNumber, bloodGroup } = req.body;
      await Donor.findOneAndUpdate(
        { _id: req.session.donorId },
        {
          name,
          city,
          contactNumber,
          bloodGroup,
        }
      );
      res.redirect("/donors/profile");
    } catch (err) {
      console.error(err);
    }
  },
};
