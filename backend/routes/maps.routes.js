import express from "express";
import { authCaptain, authUser } from "../middleware/auth.middleware.js";
import { getCoordinates , getDistanceandTime ,getAutoCompleteSuggestion} from "../controllers/map.controller.js";
import { query } from "express-validator";

const router = express.Router();

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);

router.get("/get-distence-time",
    query('pickup').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser,
    getDistanceandTime
);

router.get("/get-suggestions",
    query('input').isString().isLength({ min: 3 }),
    authUser,
    getAutoCompleteSuggestion
)

export default router;
