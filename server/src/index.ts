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

config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: +process.env.REDIS_PORT || 6379,
  username: process.env.REDIS_USERNAME || "default",
  password: process.env.REDIS_PASSWORD || "",
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: process.env.APP_NAME,
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/ping", (req, res) => {
  res.send("ok");
});

app.use("/", publicRouters);

app.use("/me", authenticateToken, meRouters);
app.use("/members", authenticateToken, memberRouters);
app.use("/permissions", authenticateToken, permissionRouters);
app.use("/roles", authenticateToken, roleRouters);
app.use("/posts", authenticateToken, postRouters);
app.use("/comments", authenticateToken, commentRouters);
app.use("/reactions", authenticateToken, reactionRouters);
app.use("/activities", authenticateToken, activityRouters);
app.use("/levels", authenticateToken, levelRouters);
app.use("/badges", authenticateToken, badgeRouters);

// connect DB
getDbConnection();

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
