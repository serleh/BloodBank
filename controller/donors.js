const Donor = require("../models/Donor");
const Contact = require("../models/Contact");

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
  getSearchDonor: (req, res) => {
    res.render("search.ejs");
  },

  searchDonor: async (req, res) => {
    const { city, bloodGroup } = req.body;
    try {
      const donors = await Donor.find({
        city: { $regex: new RegExp(city, "i") },
        bloodGroup: bloodGroup,
      });

      if (donors.length === 0) {
        const fallbackContacts = await Contact.find({
          city: { $ne: city },
        }).limit(3);

        return res.render("searchResults.ejs", {
          message: "SORRY DONORS ARE NOT AVAILABLE IN THIS CITY.",
          donors: [],
          fallbackContacts,
        });
      }

      res.render("searchResults.ejs", { donors, message: null });
    } catch (err) {
      console.error(err);
    }
  },
};
