const express = require("express");
const router = express.Router();
const User = require("../models/user");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// Route to render settings.ejs
router.get("/", ensureLoggedIn, async (req, res) => {
  try {
    // Fetch user information from the database
    const user = await User.findById(req.user.id);
    res.render("settings", { user });
  } catch (error) {
    console.error(error);
  }
});

// Route to change email
router.post("/change-email", async (req, res) => {
  const userId = req.user.id;
  const newEmail = req.body.newEmail;
  try {
    // Update user's email in the database
    await User.findByIdAndUpdate(userId, { email: newEmail });
  } catch (error) {
    console.error(error);
  }
});

// Route to delete account
router.post("/delete-account", async (req, res) => {
  const userId = req.user.id;
  try {
    // Delete user account from the database
    await User.findByIdAndDelete(userId);
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

// Save notification preferences and privacy settings
router.post("/save-preferences", async (req, res) => {
  const userId = req.user.id;
  const { emailNotifications, smsNotifications, publicProfile, dataSharing } =
    req.body;
  try {
    // Update user document with new preferences/settings
    await User.findByIdAndUpdate(userId, {
      notificationPreferences: {
        email: emailNotifications,
        sms: smsNotifications,
      },
      privacySettings: {
        publicProfile: publicProfile,
        dataSharing: dataSharing,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Render settings page with existing preferences/settings
router.get("/settings", async (req, res) => {
  const userId = req.user.id;
  try {
    // Retrieve user document
    const user = await User.findById(userId);
    // Render the settings page with the existing preferences/settings
    res.render("settings", {
      notificationPreferences: user.notificationPreferences,
      privacySettings: user.privacySettings,
    });
  } catch (error) {
    console.error(error);
  }
});

// Update preferences/settings
router.put("/update-preferences", async (req, res) => {
  const userId = req.user.id;
  const { emailNotifications, smsNotifications, publicProfile, dataSharing } =
    req.body;
  try {
    // Update user document with updated preferences/settings
    await User.findByIdAndUpdate(userId, {
      notificationPreferences: {
        email: emailNotifications,
        sms: smsNotifications,
      },
      privacySettings: {
        publicProfile: publicProfile,
        dataSharing: dataSharing,
      },
    });
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
