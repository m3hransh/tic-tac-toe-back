import WebSocket from "ws";
import { Game } from "./game";
// random port between 7000 7777
const wsPort = 7770;
const httpPort = 8181;

describe("initialize the Game server", () => {
  let game: Game;
  let ws: WebSocket;
  beforeAll((done) => {
    game = new Game(wsPort, httpPort);
    game.run(() => {
      console.log(`setup server on port: ${httpPort}`);
      done();
    });
  });
  afterAll((done) => {
    if (game.server) {
      game.server.on("close", () => {
        console.log("AFTER");
        done();
      });
      game.server.close(() => {
        console.log("CLOSING");
        game.server.unref();
      });
    }
  });
  describe("test the websocket server", () => {
    beforeEach(() => {
      ws = new WebSocket(`ws://localhost:${httpPort}`);
    });
    afterEach(() => {
      ws.terminate();
    });
    test("send a message", (done) => {
      try {
        const mockFunc = jest
          .spyOn(game, "onMessage")
          .mockImplementation((data) => {
            expect(data).toBe("messageA");
            done();
          });
        ws.on("open", () => {
          ws.send("messageA");
        });
      } catch (error) {
        expect(error).toBeNaN();
        done(error);
      }
      ws.on("close", () => {
        done();
      });
    });
    test("recieve a message", (done) => {
      let d: string;
      ws.on("open", () => {
        ws.on("message", (data: object) => {
          d = data.toString();
          expect(d).toBe("Message from the server");
          done();
        });
      });
    });
  });
});
