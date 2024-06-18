const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const authControllers = require("../controllers/auth-controller.js");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/progress",authControllers.progress);

router.get("/register", authControllers.signupRenderForm);

router.post("/signup", wrapAsync(authControllers.signup));

router.get("/login",authControllers.loginRenderForm);

router.post("/login",saveRedirectUrl,
passport.authenticate("local",{
    failureRedirect:'/login', 
    failureFlash:true
}),authControllers.login);

router.get("/logout", authControllers.logout); 

module.exports = router;