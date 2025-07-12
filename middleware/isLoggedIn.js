module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.session.donorId) {
      return res.redirect("/login");
    }
    next();
  },
};
