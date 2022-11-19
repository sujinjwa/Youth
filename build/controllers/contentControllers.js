"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.youthkit = exports.recommend = exports.qrPage = exports.qna = exports.home = exports.detail = exports.community = exports.about = void 0;

var _express = _interopRequireDefault(require("express"));

var _qrContents = require("./qrContents");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var home = function home(req, res) {
  var popup = req.query.popup;
  return res.render('home', {
    pageTitle: 'Home',
    popup: popup
  });
};

exports.home = home;

var about = function about(req, res) {
  return res.render('contents/about', {
    pageTitle: 'About'
  });
};

exports.about = about;

var youthkit = function youthkit(req, res) {
  // return res.render('contents/youthkit');
  return res.render('https://tumblbug.com/writeyouth?ref=%EA%B2%80%EC%83%89%2F%ED%82%A4%EC%9B%8C%EB%93%9C');
};

exports.youthkit = youthkit;

var community = function community(req, res) {
  var popup = encodeURIComponent('현재 커뮤니티 서비스 개발 중입니다. \n조금만 기다려주세요.');
  return res.redirect('/?popup=' + popup);
};

exports.community = community;

var qna = function qna(req, res) {
  var popup = req.query.popup;
  var id = req.params.id;
  return res.render("contents/qna_".concat(id), {
    pageTitle: 'QnA',
    popup: popup
  });
};

exports.qna = qna;

var detail = function detail(req, res) {
  return res.render('contents/detail', {
    pageTitle: '가이드북 플러스'
  });
};

exports.detail = detail;

var qrPage = function qrPage(req, res) {
  var id = req.params.id;
  return res.render("contents/qrpage".concat(id), {
    pageTitle: 'Contents',
    title: _qrContents.qrContents[id - 1].title,
    imgUrl: "/uploads/contents/".concat(id, ".jpg")
  });
};

exports.qrPage = qrPage;

var recommend = function recommend(req, res) {
  var popup = encodeURIComponent('현재 추천콘텐츠 서비스 개발 중입니다. \n조금만 기다려주세요.');
  return res.redirect('/contents/qna/1?popup=' + popup);
};

exports.recommend = recommend;