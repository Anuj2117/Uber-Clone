import express from "express";
import { body ,query } from "express-validator";
import { createNewRide, getNewFare,confirmNewRide,startNewRide ,endNewRide} from "../controllers/ride.controller.js";
import { authCaptain, authUser } from "../middleware/auth.middleware.js";
const router = express.Router();

console.log(authUser);

router.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid PickUp Address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination Address"),
  body("vehicleType")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid vehicle type"),
  createNewRide
);

router.get("/get-fare",
     authUser,
     query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup'),
     query('destination').isString().isLength({min:3}).withMessage('Invalid pickup'),
     getNewFare
);


router.post('/confirm' , 
  authCaptain,
  body('rideId').isString().isLength({min:3}).withMessage('Invalid rideId'),
  confirmNewRide
);


router.get('/start-ride',
  authCaptain,
  query('rideId').isMongoId().withMessage('Invalid ride id'),
  query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
  startNewRide
);

router.post('/end-ride',
  authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride id'),
  endNewRide
)

export default router;
