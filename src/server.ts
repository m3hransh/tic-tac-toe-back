import * as dotenv from "dotenv";
import { WebSocketServer } from "ws";
dotenv.config();
const port = 7071;
const runServer = (port: number) => {
  const wss = new WebSocketServer({ port: port });
  wss.on("connection", (ws) => {});
};

export { runServer };
runServer(port);
