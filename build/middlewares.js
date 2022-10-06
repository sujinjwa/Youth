"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.publicOnlyMiddleware = exports.protectorMiddleware = exports.localsMiddleware = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var upload = (0, _multer["default"])({
  dest: "uploads/avatars/"
}); // 모든 템플릿에서 사용 가능한 전역 변수 선언

exports.upload = upload;

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn); // res.locals.loggedIn = false;

  res.locals.loggedInUser = req.session.loggedInUser; // res.locals.errorMessage = req.session.errorMessage;
  // req.session.errorMessage = null;
  // res.locals.errorMessage = null;
  //console.log(res.locals.loggedInUser);
  //console.log(res.locals.loggedIn);s
  //console.log(req.session);
  // console.log(req.session.loggedInUser);

  next();
}; // 로그인되지 않은 유저 차단하는 미들웨어


exports.localsMiddleware = localsMiddleware;

var protectorMiddleware = function protectorMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    // req.session.errorMessage1 = "로그인이 필요한 서비스입니다.";
    return res.redirect("/login");
  }
}; // 로그인된 유저 차단하는 미들웨어


exports.protectorMiddleware = protectorMiddleware;

var publicOnlyMiddleware = function publicOnlyMiddleware(req, res, next) {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

exports.publicOnlyMiddleware = publicOnlyMiddleware;