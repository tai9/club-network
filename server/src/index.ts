import RedisStore from "connect-redis";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import Redis from "ioredis";
import { getDbConnection } from "./configs/db.config";
import memberRouters from "./routers/member.router";
import { authenticateToken } from "./middlewares/authentication";
import publicRouters from "./routers/public.router";

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

app.use("/members", memberRouters);
// app.use("/permissions", permissionRouters);
// app.use("/roles", roleRouters);
// app.use("/audit-logs", auditLogRouters);
// app.use("/nfts", nftRouters);
// app.use("/transactions", transactionRouters);

// connect DB
getDbConnection();

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
