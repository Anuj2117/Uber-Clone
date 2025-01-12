import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser,getUserProfile,logoutUser } from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name length should be atleast 3"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be alteast 6 character"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be alteast 6 character"),
  ],
  loginUser
);

router.get('/profile',authUser,getUserProfile);
router.get('/logout',authUser,logoutUser)

export default router;
