import { Server } from "socket.io";

export const initSocketServer = (server: any) => {
  return new Server(server, {
    cors: {
      origin: "http://localhost:3004",
    },
  });
};
