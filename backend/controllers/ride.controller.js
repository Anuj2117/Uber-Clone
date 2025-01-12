import {
  createRide,
  getFare,
  startRide,
  endRide,
} from "../services/ride.services.js";
import { validationResult } from "express-validator";
import { getCaptainsInTheRadius } from "../services/maps.service.js";
import { getAddressCoordinate } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { rideModel } from "../models/ride.model.js";
import { confirmRide } from "../services/ride.services.js";

export async function createNewRide(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  //console.log(req.user._id,"user id")

  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);

    const pickupCoordinates = await getAddressCoordinate(pickup);

    //     console.log("Pickup Coordinates:", pickupCoordinates);
    // console.log(`Latitude: ${pickupCoordinates.ltd}, Longitude: ${pickupCoordinates.lng}`);

    //console.log(pickupCoordinates + "coordinates");

    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );

    //console.log(captainsInRadius,"captain")

    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captainsInRadius.map((captain) => {
      console.log(captain, ride, "ride");
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });

    // console.log(captainsInRadius + "hellow");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

export async function getNewFare(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await getFare({ pickup, destination });
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function confirmNewRide(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await confirmRide({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirm",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function startNewRide(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  console.log(typeof otp);

  console.log(otp + "controller" + typeof otp);
  //console.log(ride.otp +typeof(ride.otp))

  try {
    const ride = await startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    console.log(ride + "controller");

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-start",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

export async function endNewRide(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await endRide({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-end",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
