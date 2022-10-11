import WebSocket from "ws";
import { runServer } from "./server";
// random port between 7000 7777
const port = 7771;
describe("open server", () => {
  runServer(port);
  const ws = new WebSocket(`ws://localhost:${port}`);

  test("get the message", () => {
    ws.on("open", function open() {
      ws.send("test");
    });
  });
});
