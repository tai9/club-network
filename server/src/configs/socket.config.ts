import { Server } from "socket.io";

export const initSocketServer = (server: any) => {
  return new Server(server, {
    cors: {
      origin: process.env.CLUB_NETWORK_CLIENT_URL || "http://localhost:3004",
    },
  });
};
