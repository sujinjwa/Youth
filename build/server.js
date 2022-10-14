"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _helmet = _interopRequireDefault(require("helmet"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _globalRouters = _interopRequireDefault(require("./routers/globalRouters"));

var _contentRouters = _interopRequireDefault(require("./routers/contentRouters"));

var _userRouters = _interopRequireDefault(require("./routers/userRouters"));

var _middlewares = require("./middlewares");

var _clientS = require("@aws-sdk/client-s3");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
app.use(logger);
app.use("/assets", _express["default"]["static"]("assets")); // 정적 파일인 "assets" 폴더 서버에 로드

app.use("/uploads", _express["default"]["static"]("uploads"));

if (process.env.NODE_ENV === "production") {
  app.use((0, _helmet["default"])({
    contentSecurityPolicy: false
  }));
}

app.use((0, _helmet["default"])({
  contentSecurityPolicy: false
}));
app.set("views", "./src/views");
app.set("view engine", "pug"); // session 미들웨어

app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {// maxAge: 10000,
  },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  }) // session을 mongoDB에 저장

}));
app.use(_middlewares.localsMiddleware); // 전역 변수 선언 미들웨어

app.use(_express["default"].urlencoded({
  extended: true
}));
app.use("/", _globalRouters["default"]);
app.use("/users", _userRouters["default"]);
app.use("/contents", _contentRouters["default"]);
var _default = app;
exports["default"] = _default;