const express = require("express");
const router = express.Router();

const ensureLoggedIn = require("../config/ensureLoggedIn");

// Route to render settings.ejs
router.get("/", function (req, res) {
  res.render("settings");
});

// // Change Email
// router.post("/change-email", async (req, res) => {
//   const userId = req.user.id;
//   const newEmail = req.body.newEmail;

//   try {
//     // Update user's email in the database
//     await User.findByIdAndUpdate(userId, { email: newEmail });
//   } catch (error) {
//     console.error(error);
//   }
// });

// // Delete Account
// router.post("/delete-account", async (req, res) => {
//   const userId = req.user.id;
//   try {
//     // Delete user account from the database
//     await User.findByIdAndDelete(userId);
//   } catch (error) {
//     console.error(error);
//   }
// });

module.exports = router;
