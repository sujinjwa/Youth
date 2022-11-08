"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.youthkit = exports.recommend = exports.qrPage = exports.qna = exports.home = exports.detail = exports.community = exports.about = void 0;

var _express = _interopRequireDefault(require("express"));

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
  return res.render('contents/youthkit');
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
var qrContents = [{
  title: '유골을 뿌리는 장례 방식',
  hashtags: '장례 • 장례방식',
  minutes: 3
}, {
  title: '상황별 기증 가능 장기 종류',
  hashtags: '장기기증',
  minutes: 2
}, {
  title: '부채와 상속',
  hashtags: '상속포기 • 빚 • 재산',
  minutes: 2
}, {
  title: 'SNS 기념(추모)계정 전환방법',
  hashtags: '추모 • 디지털 기록',
  minutes: 4
}, {
  title: '유품 처분 방법',
  hashtags: '유품 소각 • 유품 정리',
  minutes: 3
}, {
  title: '반려동물 신탁제도(펫신탁)',
  hashtags: '반려동물 • 신탁 • 대리인',
  minutes: 2
}];

var qrPage = function qrPage(req, res) {
  var id = req.params.id;
  return res.render('contents/qrpage', {
    pageTitle: 'Contents',
    title: qrContents[id - 1].title,
    imgUrl: "/uploads/contents/".concat(id, ".jpg")
  });
};

exports.qrPage = qrPage;

var recommend = function recommend(req, res) {
  var popup = encodeURIComponent('현재 추천콘텐츠 서비스 개발 중입니다. \n조금만 기다려주세요.');
  return res.redirect('/contents/qna/1?popup=' + popup);
};

exports.recommend = recommend;