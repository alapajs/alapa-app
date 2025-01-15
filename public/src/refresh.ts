// **DO NOT EDIT**
// This code is responsible for establishing the WebSocket connection for auto-reloading
// during development. It automatically invokes `joinRefreshSocket` in development mode.
// Any modifications to this block may break the functionality of the development environment
// and the auto-refresh mechanism. Leave this as is unless explicitly instructed otherwise.
import { joinRefreshSocket } from "alapa/dist/dev/clients";
if (process.env.NODE_ENV === "development") {
  joinRefreshSocket();
}
