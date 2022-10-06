"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.youthkit = exports.recommend = exports.qna = exports.home = exports.detail = exports.community = exports.about = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var home = function home(req, res) {
  return res.render("home", {
    pageTitle: "Home"
  });
};

exports.home = home;

var about = function about(req, res) {
  return res.render("contents/about", {
    pageTitle: "About"
  });
};

exports.about = about;

var youthkit = function youthkit(req, res) {
  return res.render("contents/youthkit");
};

exports.youthkit = youthkit;

var community = function community(req, res) {
  return res.render("contents/community", {
    pageTitle: "Community"
  });
};

exports.community = community;

var qna = function qna(req, res) {
  // console.log(req.params);
  return res.render("contents/qna", {
    pageTitle: "QnA"
  });
};

exports.qna = qna;

var detail = function detail(req, res) {
  return res.render("contents/detail", {
    pageTitle: "QR코드 렌더링"
  });
};

exports.detail = detail;

var recommend = function recommend(req, res) {
  return res.render("contents/recommend");
};

exports.recommend = recommend;