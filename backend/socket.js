import { Server } from "socket.io";
import { userModel } from "./models/user.model.js";
import { captainModel } from "./models/captain.model.js";

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      console.log(`Join event: userId = ${userId}, userType = ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });


    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      //console.log(data, "data");

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

export const sendMessageToSocketId = (socketId, messageObject) => {
  
  //console.log(messageObject , "messageObject");

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

export { io, initializeSocket };