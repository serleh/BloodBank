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

  // searchDonor: async (req, res) => {
  //   const { city, bloodGroup } = req.body;
  //   try {
  //     const donors = await Donor.find({
  //       city: { $regex: new RegExp(city, "i") },
  //       bloodGroup: { $regex: new RegExp(bloodGroup, "i") },
  //     });

  //     if (donors.length === 0) {
  //       const fallbackContacts = await Contact.find({
  //         city: { $ne: city },
  //       }).limit(3);

  //       return res.render("searchResults.ejs", {
  //         message: "SORRY DONORS ARE NOT AVAILABLE IN THIS CITY.",
  //         donors: [],
  //         fallbackContacts,
  //       });
  //     }

  //     res.render("searchResults.ejs", { donors, message: null });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },

  searchDonor: async (req, res) => {
    const { city, bloodGroup } = req.body;
    console.log("Search Inputs:", city, bloodGroup);

    const allDonors = await Donor.find({});
    // console.log("All Donors in DB:", allDonors);

    try {
      const donors = await Donor.find({
        city: { $regex: new RegExp(city.trim(), "i") },
        bloodGroup: {
          $regex: new RegExp(bloodGroup.trim().replace(/\+/g, "\\+"), "i"),
        },
      });

      //console.log("Matched Donors:", donors);

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

      res.render("searchResults.ejs", {
        donors,
        message: null,
        fallbackContacts: [],
      });
    } catch (err) {
      console.error(err);
    }
  },
};
