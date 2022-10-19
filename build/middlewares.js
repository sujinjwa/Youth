"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicOnlyMiddleware = exports.protectorMiddleware = exports.localsMiddleware = exports.beforeDeleteUser = exports.avatarUpload = void 0;

var _clientS = require("@aws-sdk/client-s3");

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 모든 템플릿에서 사용 가능한 전역 변수 선언
var localsMiddleware = function localsMiddleware(req, res, next) {
  // res.header(
  //   "Access-Control-Allow-Origin",
  //   "https://writeyouth.s3.ap-northeast-2.amazonaws.com"
  // );
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.loggedInUser;
  res.locals.isHeroku = isHeroku;
  next();
};

exports.localsMiddleware = localsMiddleware;
var s3 = new _clientS.S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
});
var s3ImageUploader = (0, _multerS["default"])({
  s3: s3,
  bucket: "writeyouth",
  Key: "images/",
  acl: "public-read"
});
var isHeroku = process.env.NODE_ENV === "production";
var avatarUpload = (0, _multer["default"])({
  dest: "uploads/avatars/",
  storage: isHeroku ? s3ImageUploader : undefined
}); // 로그인되지 않은 유저 차단하는 미들웨어

exports.avatarUpload = avatarUpload;

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
}; // 회원 탈퇴 이전에 경고창 띄우는 미들웨어


exports.publicOnlyMiddleware = publicOnlyMiddleware;

var beforeDeleteUser = function beforeDeleteUser(req, res) {
  return res.render("users/beforeDeleteUser", {
    pageTitle: "DeleteUser"
  }); // next();
};

exports.beforeDeleteUser = beforeDeleteUser;