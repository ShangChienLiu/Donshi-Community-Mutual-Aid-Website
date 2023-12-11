import io from "socket.io-client";
import Config from "../Config";
const { APIKEY, HOST } = Config;

export default class MySocketFactory {
  static #socket;

  static create() {
    try {
      this.#socket = io(HOST, {
        path: "/api/socket.io/",
        autoConnect: false,
        transportOptions: {
          polling: {
            extraHeaders: {
              "api-key": APIKEY,
            },
          },
        },
      });
    } catch (error) {
      console.log("錯誤資訊")
      console.log(error);
    }
  }
  static getSocket() {
    if (this.#socket == null || this.#socket === "undefined") {
      this.create();
    }
    if (!this.#socket?.connected) {
      this.#socket.connect();
    }

    return this.#socket;
  }
  static clearSocket() {
    if (!(this.#socket == null || this.#socket === "undefined")) {
      console.log("close socket");
      this.#socket.close();
    }
  }
  static preprocessData(data) {
    data.effected = data.hasOwnProperty("reply") ? "reply" : "comment";
    return data;
  }
}
