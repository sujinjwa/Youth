"use strict";

require("dotenv/config");

require("./db");

require("./model/User");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 4000;

var handleListening = function handleListening() {
  return console.log("\u2705 Server is listening to port ".concat(PORT));
};

_server["default"].listen(PORT, handleListening);