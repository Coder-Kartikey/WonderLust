import express from 'express';
const router = express.Router({mergeParams : true});

import { wrapAsync } from "../utils/wrapAsync.js";

import passport from 'passport';

import { saveReturnTo } from "../middelware.js";

import userController from "../controllers/users.mjs";

//signup route
router.route("/signup")
.get(userController.renderSignupForm) //signup get route
.post(wrapAsync(userController.userSignup)); //signup post route

//login route
router.route("/login")
.get(userController.renderLoginForm) //login get route
.post(saveReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', failureFlash: true }), userController.userLogin); //login post route

//logout route
router.get("/logout", userController.userLogout);

export default router;