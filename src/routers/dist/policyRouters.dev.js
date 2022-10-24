"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _policyController = require("../controllers/policyController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var serviceRouter = _express["default"].Router();

serviceRouter.get("/", _policyController.policy);
var _default = serviceRouter;
exports["default"] = _default;