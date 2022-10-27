"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _contentControllers = require("../controllers/contentControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var contentRouter = _express["default"].Router();

contentRouter.get("/qna/:id(\\d+)", _contentControllers.qna);
contentRouter.get("/detail", _contentControllers.detail);
contentRouter.get("/detail/:id(\\d+)", _contentControllers.qrPage);
contentRouter.get("/recommend", _contentControllers.recommend);
var _default = contentRouter;
exports["default"] = _default;