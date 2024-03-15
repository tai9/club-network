import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
// import { getDbConnection } from "./configs/db.config";
// import memberRouters from "./routers/member.router";
// import { authenticateToken } from "./middlewares/authentication";
// import publicRouters from "./routers/public.router";
// import permissionRouters from "./routers/permission.router";
// import roleRouters from "./routers/role.router";
// import postRouters from "./routers/post.router";
// import commentRouters from "./routers/comment.router";
// import reactionRouters from "./routers/reaction.router";
// import activityRouters from "./routers/activity.router";
// import badgeRouters from "./routers/badge.router";
// import levelRouters from "./routers/level.router";
// import meRouters from "./routers/me.router";
// import { createServer } from "node:http";
// import { initSocketServer } from "./configs/socket.config";
// import notificationRouters from "./routers/notification.router";
// import multer from "multer";
// import csvParser from "csv-parser";
// import fs from "fs";
// import Papa from "papaparse";
// import "./configs/redis.config";
// import ticketRouters from "./routers/ticket.router";
// import webhookRouters from "./routers/webhook.router";

config();

const app = express();
const PORT = process.env.PORT || 8000;
// const server = createServer(app);
// export const io = initSocketServer(server);

// Set up multer for handling file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Club Network API");
});

app.use("/ping", (req, res) => {
  res.send("ok");
});

// app.use("/auth-ping", authenticateToken, (req, res) => {
//   res.send("auth ok");
// });

// app.use("/", publicRouters);

// webhooks
// app.use("/webhook", webhookRouters);

// app.use("/members", upload.single("file"), memberRouters);
// app.use("/posts", postRouters);
// app.use("/levels", levelRouters);

// app.use("/me", authenticateToken, meRouters);
// app.use("/permissions", authenticateToken, permissionRouters);
// app.use("/roles", authenticateToken, roleRouters);
// app.use("/comments", authenticateToken, commentRouters);
// app.use("/reactions", authenticateToken, reactionRouters);
// app.use("/activities", authenticateToken, activityRouters);
// app.use("/badges", authenticateToken, badgeRouters);
// app.use("/notifications", authenticateToken, notificationRouters);

// app.use("/tickets", upload.single("file"), authenticateToken, ticketRouters);

// connect DB
// getDbConnection();

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
// io.listen(3009);
// io.on("connection", (socket) => {
//   const username = socket.handshake.auth.username;
//   const users = getUsersOnline();
//   socket.emit("users", users);
//   console.log("a user connected", username);

//   // Join the user to a specific room based on their ID
//   socket.join(`user-${username}`);
// });

// io.use((socket, next) => {
//   const username = socket.handshake.auth.username;
//   if (!username) {
//     return next(new Error("invalid username"));
//   }
//   // socket.username = username;
//   next();
// });

// const getUsersOnline = () => {
//   const users = [];
//   for (let [id, socket] of io.of("/").sockets) {
//     // if (userws !== "tailor2" && socket.handshake.auth.userws === "tailor2") {
//     //   io.to(id).emit("NOTI_RECEIVE", `Hello from, ${userws}`);
//     // }
//     users.push({
//       userID: id,
//       username: socket.handshake.auth.username,
//     });
//   }
//   return users;
// };
