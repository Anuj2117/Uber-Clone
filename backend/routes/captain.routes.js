import express from "express";
import { body } from "express-validator";
import { registerCaptain , loginCaptain ,getCaptainProfile , logoutCaptain } from "../controllers/captaion.controller.js";
import { authCaptain } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 10 })
      .withMessage("Plate must be at least 10 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 2 })
      .withMessage("Capacity must be at least 2"),
    body("vehicle.typeofVechicle")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain
);

router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
],
loginCaptain
);

router.get('/profile',authCaptain,getCaptainProfile);
router.get('/logout',authCaptain, logoutCaptain)

export default router;
