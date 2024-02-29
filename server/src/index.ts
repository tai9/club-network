import RedisStore from "connect-redis";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import Redis from "ioredis";
import { getDbConnection } from "./configs/db.config";
import memberRouters from "./routers/member.router";
import { authenticateToken } from "./middlewares/authentication";
import publicRouters from "./routers/public.router";
import permissionRouters from "./routers/permission.router";
import roleRouters from "./routers/role.router";
import postRouters from "./routers/post.router";
import commentRouters from "./routers/comment.router";
import reactionRouters from "./routers/reaction.router";
import activityRouters from "./routers/activity.router";
import badgeRouters from "./routers/badge.router";
import levelRouters from "./routers/level.router";
import meRouters from "./routers/me.router";
import { createServer } from "node:http";
import { initSocketServer } from "./configs/socket.config";
import notificationRouters from "./routers/notification.router";
import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";
import Papa from "papaparse";

config();

// const redisClient = new Redis({
//   host: process.env.REDIS_HOST || "127.0.0.1",
//   port: +process.env.REDIS_PORT || 6379,
//   username: process.env.REDIS_USERNAME || "default",
//   password: process.env.REDIS_PASSWORD || "",
// });

// const redisStore = new RedisStore({
//   client: redisClient,
//   prefix: process.env.APP_NAME,
// });

const app = express();
const PORT = process.env.PORT || 8000;
const server = createServer(app);
export const io = initSocketServer(server);

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", (req, res) => {
  res.send("Club Network API");
});

app.use("/ping", (req, res) => {
  res.send("ok");
});

app.use("/", publicRouters);

app.use("/members", upload.single("file"), memberRouters);
app.use("/posts", postRouters);
app.use("/levels", levelRouters);

app.use("/me", authenticateToken, meRouters);
app.use("/permissions", authenticateToken, permissionRouters);
app.use("/roles", authenticateToken, roleRouters);
app.use("/comments", authenticateToken, commentRouters);
app.use("/reactions", authenticateToken, reactionRouters);
app.use("/activities", authenticateToken, activityRouters);
app.use("/badges", authenticateToken, badgeRouters);
app.use("/notifications", authenticateToken, notificationRouters);

// connect DB
getDbConnection();

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
io.listen(3009);
io.on("connection", (socket) => {
  const username = socket.handshake.auth.username;
  const users = getUsersOnline();
  socket.emit("users", users);
  console.log("a user connected", username);

  // Join the user to a specific room based on their ID
  socket.join(`user-${username}`);
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  // socket.username = username;
  next();
});

const getUsersOnline = () => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    // if (userws !== "tailor2" && socket.handshake.auth.userws === "tailor2") {
    //   io.to(id).emit("NOTI_RECEIVE", `Hello from, ${userws}`);
    // }
    users.push({
      userID: id,
      username: socket.handshake.auth.username,
    });
  }
  return users;
};
