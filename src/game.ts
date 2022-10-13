import { WebSocket, WebSocketServer } from "ws";
import { createServer, IncomingMessage, Server } from "http";

class Game {
  wss: WebSocketServer;
  server: Server;
  wsPort: number;
  httpPort: number;
  constructor(wsPort: number, httpPort: number) {
    this.wsPort = wsPort;
    this.httpPort = httpPort;
    const server = createServer();
    this.server = server;
    this.wss = new WebSocketServer({ server });
  }

  onMessage(data: string) {
    console.log(data);
  }

  run(callback?: () => void | undefined) {
    this.wss.on("connection", (ws) => {
      ws.send("Message from the server");
      ws.on("message", (data: any) => {
        this.onMessage(data.toString());
      });
    });
    this.server.listen(this.httpPort, callback);
  }

  close(callback?: (error?: Error | undefined) => void | undefined) {
    this.server.close(callback);
  }
}

export { Game };
