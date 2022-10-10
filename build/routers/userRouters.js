"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userControllers = require("../controllers/userControllers");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router(); // userRouter.get("/:id([0-9a-f]{24})", seeUser);


userRouter.route("/edit").all(_middlewares.protectorMiddleware).get(_userControllers.getEditUser).post(_middlewares.upload.single("avatar"), _userControllers.postEditUser);
userRouter.route("/editPW").all(_middlewares.protectorMiddleware).get(_userControllers.getEditPW).post(_userControllers.postEditPW);
userRouter.get("/beforeDelete", _middlewares.protectorMiddleware, _middlewares.beforeDeleteUser);
userRouter.get("/delete", _middlewares.protectorMiddleware, _userControllers.deleteUser);
var _default = userRouter;
exports["default"] = _default;