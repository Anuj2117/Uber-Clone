import { rideModel } from "../models/ride.model.js";
import { sendMessageToSocketId } from "../socket.js";
import { getDistenceTime } from "./maps.service.js";
import crypto from "crypto";

export async function getFare({ pickup, destination }) {
  console.log(pickup, destination + "getfare");

  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await getDistenceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    bike: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    bike: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    bike: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    bike: Math.round(
      baseFare.bike +
        (distanceTime.distance.value / 1000) * perKmRate.bike +
        (distanceTime.duration.value / 60) * perMinuteRate.bike
    ),
  };

  return fare;
}

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

export async function createRide({ user, pickup, destination, vehicleType }) {
  //console.log(pickup, destination, vehicleType +"in services");

  if (!pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare({ pickup, destination });

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
}

export async function confirmRide({ rideId, captain }) {
  if (!rideId) {
    throw new Error("RideId is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    },{
      new:true
    }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

    console.log(ride.status +"ride status after confirm ride ")

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;

}

export async function startRide({ rideId, otp, captain }) {
  console.log("OTP from query:", otp, typeof otp);

  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

 // console.log("OTP in DB:", ride.otp, typeof ride.otp);
  console.log(ride.status +"ride status after start ride ")

  if (!ride) {
    throw new Error("Ride not found");
  }
  //console.log(ride.otp + "ride otp" + typeof ride.otp);


  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (String(ride.otp) !== String(otp)) {
    console.log("miss match")
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-start",
    data: ride,
  });

  return ride;
}

export async function endRide({ rideId, captain }) {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user")
    .populate("captain")
    .populate("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
}
