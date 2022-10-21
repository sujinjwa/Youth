"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.postEditPW = exports.getEditPW = exports.postEditUser = exports.getEditUser = exports.finishNaverLogin = exports.startNaverLogin = exports.finishKakaoLogin = exports.startKakaoLogin = exports.logout = exports.postFindPW = exports.getFindPW = exports.showID = exports.postFindID = exports.getFindID = exports.postLogin = exports.getLogin = exports.welcome = exports.postJoin = exports.getJoin = void 0;

var _User = _interopRequireDefault(require("../model/User"));

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { smtpTransport } from "../../config/email";
// min ~ max 까지 랜덤으로 숫자 생성하는 함수
var generateRandom = function generateRandom(min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
}; // 전송한 이메일과 인증번호 확인하기 위한 변수


var sendingEmail, sentNumber; // 이메일 전송 함수

var sendMailForJoin = function sendMailForJoin(req, res) {
  var email, pageTitle, regPass, existingUser, main;
  return regeneratorRuntime.async(function sendMailForJoin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          main = function _ref() {
            var number, transporter, mailOptions;
            return regeneratorRuntime.async(function main$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    number = generateRandom(111111, 999999); // 인증번호

                    sentNumber = number; //let testAccount = await nodemailer.createTestAccount();
                    // nodemailer 전송기 생성 (메일 발송 서비스에 대한 환경 설정)

                    transporter = _nodemailer["default"].createTransport({
                      server: "naver",
                      host: "smtp.naver.com",
                      // SMTP 서버명
                      port: 587,
                      // SMTP 포트
                      // secure: false,
                      auth: {
                        user: process.env.NODEMAILER_USER,
                        // 보내는 사람의 이메일 계정 아이디
                        pass: process.env.NODEMAILER_PASS // 보내는 사람의 이메일 계정 비밀번호

                      }
                    }); // 메시지 옵션 설정

                    mailOptions = {
                      from: process.env.NODEMAILER_USER,
                      to: email,
                      // 사용자의 아이디
                      subject: "[유언을쓰다] 이메일 인증 안내입니다.",
                      // 이메일 제목
                      html: "<div style=\"display:flex; flex-direction:column; justify-content:center; align-items:center; margin:0 auto; width:475px\">\n                <div style=\"display:flex; align-items:center; margin: 20px\">\n                  <img src=\"https://tumblbug-upi.imgix.net/330fc16f-de5c-4d76-bbeb-a477519c3f29.png?auto=format%2Ccompress&ch=Save-Data&facepad=2.0&fit=facearea&h=200&mask=ellipse&w=200&s=4a832561eefefc964968a6ea17e7fc24\" style=\"width:60px\" alt=\"\" />\n                  <h1 style=\"margin-left: 20px; font-size:28px\">\uC778\uC99D\uBC88\uD638\uB97C \uC54C\uB824\uB4DC\uB9BD\uB2C8\uB2E4.</h1>\n                </div>\n                <hr style=\"width:100%; margin-bottom: 30px\" />\n                <h3>\uC548\uB155\uD558\uC138\uC694. \uC720\uC5B8\uC744 \uC4F0\uB2E4\uC5D0 \uAC00\uC785\uD574\uC8FC\uC154\uC11C \uAC10\uC0AC\uD569\uB2C8\uB2E4.</h3>\n                <p>\uC720\uC5B8\uC744 \uC4F0\uB2E4\uC5D0 \uB4F1\uB85D\uD55C \uBA54\uC77C\uC8FC\uC18C\uAC00 \uC62C\uBC14\uB978\uC9C0 \uD655\uC778\uD558\uAE30 \uC704\uD55C \uBA54\uC77C\uC785\uB2C8\uB2E4.</p>\n              \n                <h1 style=\"font-size:50px\">".concat(number, "</h1>\n              \n                <p>\uD68C\uC6D0 \uAC00\uC785 \uD398\uC774\uC9C0\uB85C \uB3CC\uC544\uAC00 \uC778\uC99D\uD0A4\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC2DC\uAC70\uB098</p>\n                <p>\uC778\uC99D\uD0A4\uB97C \uBCF5\uC0AC \uD6C4 \uBD99\uC5EC\uB123\uAE30\uD558\uC5EC \uAC00\uC785\uC744 \uC9C4\uD589\uD574\uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4.</p>\n\n                <hr style=\"width:100%; margin-top: 30px\" />\n                <p style=\"margin-top: 10px\">\uC774 \uBA54\uC77C\uC740 \uBC1C\uC2E0 \uC804\uC6A9\uC73C\uB85C \uD68C\uC2E0\uC774 \uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.</p>\n                <p>\uAD81\uAE08\uD558\uC2E0 \uC0AC\uD56D\uC740 nasujin744@naver.com\uB85C \uBB38\uC758\uD574 \uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4.</p>\n            </div>") // text: "오른쪽 숫자 6자리를 입력해주세요: " + number,

                    }; // sendMail() 메서드 사용하여 메시지 전송

                    transporter.sendMail(mailOptions, function (error, info) {
                      if (error) {
                        console.log(error); // return res.status(400).render("users/join", {
                        //   pageTitle,
                        //   errorMessage: `이메일 전송에 실패했습니다. 회원가입을 다시 시도해주세요. "${error._message}"`,
                        // });
                      } else {
                        console.log("성공적으로 이메일 전송했습니다.", info.response);
                        transporter.close();
                      }
                    });
                    sendingEmail = email;
                    return _context.abrupt("return", res.render("users/join", {
                      pageTitle: "Join",
                      email: email,
                      popup: "\uD574\uB2F9 \uC774\uBA54\uC77C \uACC4\uC815\uC73C\uB85C \uC778\uC99D\uBC88\uD638\uB97C \uC804\uC1A1\uD588\uC2B5\uB2C8\uB2E4. \n5\uBD84 \uC774\uC0C1 \uC778\uC99D \uC774\uBA54\uC77C\uC774 \uB3C4\uCC29\uD558\uC9C0 \uC54A\uC740 \uACBD\uC6B0, \uC785\uB825\uD55C \uC774\uBA54\uC77C \uBC1C\uC1A1 \uC8FC\uC18C\uB97C \uB2E4\uC2DC \uD55C \uBC88 \uD655\uC778\uD574\uC8FC\uC138\uC694."
                    }));

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          email = req.body.email;
          pageTitle = "Join";
          regPass = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_09a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;

          if (regPass.test(email)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).render("users/join", {
            pageTitle: pageTitle,
            popup: "잘못된 이메일입니다. 다시 확인해주세요."
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 8:
          existingUser = _context2.sent;

          if (!existingUser) {
            _context2.next = 13;
            break;
          }

          if (!(existingUser.socialOnly === true)) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).render("users/join", {
            pageTitle: pageTitle,
            popup: "\uC774\uBBF8 \uCE74\uCE74\uC624\uD1A1 \uD639\uC740 \uB124\uC774\uBC84\uB85C \uD68C\uC6D0\uAC00\uC785\uD55C \uACC4\uC815\uC785\uB2C8\uB2E4. \n \uD574\uB2F9 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD574\uC8FC\uC138\uC694."
          }));

        case 12:
          return _context2.abrupt("return", res.status(400).render("users/join", {
            pageTitle: pageTitle,
            popup: "이미 사용중인 이메일입니다."
          }));

        case 13:
          main(); // return res.render("users/join", { pageTitle: "Join", email });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var sendMailForFindPW = function sendMailForFindPW(req, res) {
  var email, existingUser, main;
  return regeneratorRuntime.async(function sendMailForFindPW$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          main = function _ref2() {
            var number, transporter, mailOptions;
            return regeneratorRuntime.async(function main$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    number = generateRandom(111111, 999999);
                    sentNumber = number;
                    transporter = _nodemailer["default"].createTransport({
                      server: "naver",
                      host: "smtp.naver.com",
                      port: 587,
                      auth: {
                        user: process.env.NODEMAILER_USER,
                        pass: process.env.NODEMAILER_PASS
                      }
                    });
                    mailOptions = {
                      from: process.env.NODEMAILER_USER,
                      to: email,
                      subject: "[유언을쓰다] 이메일 인증 안내입니다.",
                      html: "<div style=\"display:flex; flex-direction:column; justify-content:center; align-items:center; margin:0 auto; width:475px\">\n                  <div style=\"display:flex; align-items:center; margin: 20px\">\n                    <img src=\"https://tumblbug-upi.imgix.net/330fc16f-de5c-4d76-bbeb-a477519c3f29.png?auto=format%2Ccompress&ch=Save-Data&facepad=2.0&fit=facearea&h=200&mask=ellipse&w=200&s=4a832561eefefc964968a6ea17e7fc24\" style=\"width:60px\" alt=\"\" />\n                    <h1 style=\"margin-left: 20px; font-size:28px\">\uC778\uC99D\uBC88\uD638\uB97C \uC54C\uB824\uB4DC\uB9BD\uB2C8\uB2E4.</h1>\n                  </div>\n                  <hr style=\"width:100%; margin-bottom: 30px\" />\n                  <h3>\uBE44\uBC00\uBC88\uD638 \uC7AC\uC124\uC815\uC744 \uC704\uD574 \uC0AC\uC6A9\uC790 \uD655\uC778\uC744 \uC9C4\uD589\uD569\uB2C8\uB2E4.</h3>\n                \n                  <h1 style=\"font-size:50px\">".concat(number, "</h1>\n                \n                  <p>\uBE44\uBC00\uBC88\uD638 \uCC3E\uAE30 \uD398\uC774\uC9C0\uB85C \uB3CC\uC544\uAC00 \uC778\uC99D\uD0A4\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC2DC\uAC70\uB098</p>\n                  <p>\uC778\uC99D\uD0A4\uB97C \uBCF5\uC0AC \uD6C4 \uBD99\uC5EC\uB123\uAE30\uD558\uC5EC \uBE44\uBC00\uBC88\uD638 \uC7AC\uC124\uC815\uC744 \uC9C4\uD589\uD574\uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4.</p>\n\n                  <hr style=\"width:100%; margin-top: 30px\" />\n                  <p style=\"margin-top: 10px\">\uC774 \uBA54\uC77C\uC740 \uBC1C\uC2E0 \uC804\uC6A9\uC73C\uB85C \uD68C\uC2E0\uC774 \uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.</p>\n                  <p>\uAD81\uAE08\uD558\uC2E0 \uC0AC\uD56D\uC740 nasujin744@naver.com\uB85C \uBB38\uC758\uD574 \uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4.</p>\n              </div>")
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log("성공적으로 이메일을 전송했습니다.", info.response);
                        transporter.close();
                      }
                    });
                    sendingEmail = email;
                    return _context3.abrupt("return", res.render("users/findPW", {
                      pageTitle: "Find Password",
                      email: email,
                      popup: "해당 이메일 계정으로 인증번호를 전송했습니다."
                    }));

                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          };

          email = req.body.email;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_User["default"].exists({
            email: email
          }));

        case 4:
          existingUser = _context4.sent;

          if (existingUser) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(400).render("users/findPW", {
            pageTitle: "Find Password",
            popup: "가입된 계정이 아닙니다."
          }));

        case 7:
          main();

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var getJoin = function getJoin(req, res) {
  // let location;
  // if (typeof document !== "undefined") {
  //   location = document.location;
  // }
  // const emailBtn = location.querySelector(".send__email");
  // emailBtn.addEventListener("click", main);
  return res.render("users/join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = function postJoin(req, res) {
  var _req$body, selfAuthenti, name, password, passwordConfirm, email, gender, year, month, date, pageTitle, regPass, isHeroku;

  return regeneratorRuntime.async(function postJoin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, selfAuthenti = _req$body.selfAuthenti, name = _req$body.name, password = _req$body.password, passwordConfirm = _req$body.passwordConfirm, email = _req$body.email, gender = _req$body.gender, year = _req$body.year, month = _req$body.month, date = _req$body.date; // console.log(req.body);
          //if ((!name && email) || (!password && email) || (!selfAuthenti && email)) {
          //if (email || !(email === undefined)) {

          if (!email) {
            _context5.next = 4;
            break;
          }

          sendMailForJoin(req, res);
          return _context5.abrupt("return");

        case 4:
          // console.log("email:", email);
          // console.log("글로벌 값 sendingEmail: ", sendingEmail);
          // console.log("글로벌 값: ", sentNumber, typeof sentNumber);
          // console.log("유저가 받아서 입력한 값: ", selfAuthenti, typeof selfAuthenti);
          pageTitle = "Join";

          if (!(sentNumber != Number(selfAuthenti))) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(400).render("users/join", {
            pageTitle: pageTitle,
            popup: "인증번호가 일치하지 않습니다.",
            email: sendingEmail,
            name: name,
            password: password,
            passwordConfirm: passwordConfirm,
            year: year,
            month: month,
            date: date
          }));

        case 7:
          // +) 비밀번호 조합 숫자 + 영어로! 8자리 이상!
          // let regPass = /^(?=[a-zA-Z0-9]{8,20}$/;
          regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

          if (regPass.test(password)) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", res.status(400).render("users/join", {
            pageTitle: pageTitle,
            popup: "비밀번호는 영문, 숫자 조합으로 8-20자리 입력해주세요",
            email: sendingEmail,
            selfAuthenti: selfAuthenti,
            name: name,
            year: year,
            month: month,
            date: date
          }));

        case 10:
          if (!(password != passwordConfirm)) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", res.status(400).render("users/join", {
            pageTitle: pageTitle,
            popup: "비밀번호가 일치하지 않습니다",
            email: sendingEmail,
            selfAuthenti: selfAuthenti,
            name: name,
            password: password,
            year: year,
            month: month,
            date: date
          }));

        case 12:
          // if (phone.includes("-")) {
          //   return res.status(400).render("users/join", {
          //     pageTitle,
          //     errorMessage: "휴대폰 번호가 형식에 맞지 않습니다.",
          //   });
          // }
          // if (typeof phone !== ) {
          //   return res.status(400).render("users/join", {
          //     pageTitle,
          //     errorMessage: "휴대폰 번호가 형식에 맞지 않습니다.",
          //   });
          // }
          isHeroku = process.env.NODE_ENV === "production";
          _context5.prev = 13;
          _context5.next = 16;
          return regeneratorRuntime.awrap(_User["default"].create({
            name: name,
            email: sendingEmail,
            password: password,
            phone: "",
            gender: gender,
            birth: {
              year: year,
              month: month,
              date: date
            },
            avatarUrl: isHeroku ? "https://writeyouth.s3.ap-northeast-2.amazonaws.com/bb145753680b848117370a59aeec13a7" : "/uploads/avatars/basic_profile.jpg",
            socialOnly: false
          }));

        case 16:
          return _context5.abrupt("return", res.redirect("/welcome"));

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](13);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(400).render("users/join", {
            pageTitle: pageTitle,
            popup: "\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \n\uC790\uC138\uD55C \uC5D0\uB7EC\uB294 \uB2E4\uC74C\uACFC \uAC19\uC2B5\uB2C8\uB2E4. \"".concat(_context5.t0._message, "\"")
          }));

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[13, 19]]);
};

exports.postJoin = postJoin;

var welcome = function welcome(req, res) {
  return res.render("users/welcome", {
    pageTitle: "Finish Join"
  });
};

exports.welcome = welcome;

var getLogin = function getLogin(req, res) {
  var popup = req.query.popup;
  return res.render("users/login", {
    pageTitle: "Login",
    popup: popup
  });
};

exports.getLogin = getLogin;

var postLogin = function postLogin(req, res) {
  var _req$body2, email, password, pageTitle, user, match;

  return regeneratorRuntime.async(function postLogin$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          pageTitle = "Login";
          _context6.next = 4;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 4:
          user = _context6.sent;

          if (user) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(400).render("users/login", {
            pageTitle: pageTitle,
            errorMessage: "가입되어 있지 않은 이메일 주소입니다."
          }));

        case 7:
          if (!(user.socialOnly === true)) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(400).render("users/login", {
            pageTitle: pageTitle,
            errorMessage: "카카오톡 혹은 네이버로 가입한 계정입니다. 해당 계정으로 로그인해주세요."
          }));

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 11:
          match = _context6.sent;

          if (match) {
            _context6.next = 14;
            break;
          }

          return _context6.abrupt("return", res.status(400).render("users/login", {
            pageTitle: pageTitle,
            errorMessage: "비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
          }));

        case 14:
          // req.session 객체에 로그인한 유저 정보 추가
          req.session.loggedIn = true;
          req.session.loggedInUser = user;
          return _context6.abrupt("return", res.redirect("/"));

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.postLogin = postLogin;

var getFindID = function getFindID(req, res) {
  return res.render("users/findID", {
    pageTitle: "Find ID"
  });
};

exports.getFindID = getFindID;

var postFindID = function postFindID(req, res) {
  var _req$body3, name, year, month, date, user, query;

  return regeneratorRuntime.async(function postFindID$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body3 = req.body, name = _req$body3.name, year = _req$body3.year, month = _req$body3.month, date = _req$body3.date; //console.log(name, year, month, date);

          _context7.next = 3;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            name: name,
            year: year,
            month: month,
            date: date
          }));

        case 3:
          user = _context7.sent;
          console.log(user);

          if (!(user === null)) {
            _context7.next = 8;
            break;
          }

          query = _querystring["default"].stringify({
            name: null,
            email: null
          });
          return _context7.abrupt("return", res.redirect("/login/showID?" + query));

        case 8:
          query = _querystring["default"].stringify({
            name: user.name,
            email: user.email
          });
          return _context7.abrupt("return", res.redirect("/login/showID?" + query));

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.postFindID = postFindID;

var showID = function showID(req, res) {
  // const user = req.session.foundUser;
  // req.session.foundUser = null;
  var _req$query = req.query,
      name = _req$query.name,
      email = _req$query.email;
  return res.render("users/showID", {
    name: name,
    email: email,
    pageTitle: "Show ID"
  });
};

exports.showID = showID;

var getFindPW = function getFindPW(req, res) {
  return res.render("users/findPW", {
    pageTitle: "Find Password"
  });
};

exports.getFindPW = getFindPW;

var postFindPW = function postFindPW(req, res) {
  var _req$body4, email, selfAuthenti, name, newPassword, newPasswordConfirm, pageTitle, existingUser, regPass, newPassword2, popup;

  return regeneratorRuntime.async(function postFindPW$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$body4 = req.body, email = _req$body4.email, selfAuthenti = _req$body4.selfAuthenti, name = _req$body4.name, newPassword = _req$body4.newPassword, newPasswordConfirm = _req$body4.newPasswordConfirm;

          if (!email) {
            _context8.next = 4;
            break;
          }

          sendMailForFindPW(req, res);
          return _context8.abrupt("return");

        case 4:
          pageTitle = "Find Password";

          if (!(sentNumber != Number(selfAuthenti))) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return", res.status(400).render("users/findPW", {
            pageTitle: pageTitle,
            popup: "인증번호가 일치하지 않습니다.",
            email: sendingEmail
          }));

        case 7:
          _context8.next = 9;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            sendingEmail: sendingEmail,
            name: name
          }));

        case 9:
          existingUser = _context8.sent;

          if (existingUser) {
            _context8.next = 12;
            break;
          }

          return _context8.abrupt("return", res.status(400).render("users/findPW", {
            pageTitle: pageTitle,
            popup: "입력한 정보로 조회된 회원을 찾을 수 없습니다.",
            email: sendingEmail,
            selfAuthenti: selfAuthenti,
            name: name
          }));

        case 12:
          regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

          if (regPass.test(newPassword)) {
            _context8.next = 15;
            break;
          }

          return _context8.abrupt("return", res.status(400).render("users/findPW", {
            pageTitle: pageTitle,
            newPassError: "비밀번호는 영문, 숫자 조합으로 8-20자리 입력해주세요",
            email: sendingEmail,
            selfAuthenti: selfAuthenti,
            name: name
          }));

        case 15:
          if (!(newPassword !== newPasswordConfirm)) {
            _context8.next = 17;
            break;
          }

          return _context8.abrupt("return", res.status(400).render("users/findPW", {
            notMatchError: "비밀번호가 일치하지 않습니다. 입력하신 내용을 다시 확인해주세요.",
            email: sendingEmail,
            selfAuthenti: selfAuthenti,
            name: name
          }));

        case 17:
          _context8.next = 19;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(newPassword, 5));

        case 19:
          newPassword2 = _context8.sent;
          _context8.prev = 20;
          _context8.next = 23;
          return regeneratorRuntime.awrap(_User["default"].findByIdAndUpdate(existingUser._id, {
            password: newPassword2
          }));

        case 23:
          popup = encodeURIComponent("비밀번호를 변경했습니다. 변경된 비밀번호로 로그인해주세요.");
          return _context8.abrupt("return", res.redirect("/login?popup=" + popup));

        case 27:
          _context8.prev = 27;
          _context8.t0 = _context8["catch"](20);
          console.log(_context8.t0);
          return _context8.abrupt("return", res.status(400).render("users/findPW", {
            errorMessage: "\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uC790\uC138\uD55C \uC5D0\uB7EC\uB294 \uB2E4\uC74C\uACFC \uAC19\uC2B5\uB2C8\uB2E4. ".concat(_context8.t0._message)
          }));

        case 31:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[20, 27]]);
};

exports.postFindPW = postFindPW;

var logout = function logout(req, res) {
  var popup = req.query.popup; // 비밀번호 변경한 경우

  if (!popup) {
    // 그냥 로그아웃한 경우
    popup = "로그아웃되었습니다.";
  }

  req.session.destroy();
  return res.redirect("/?popup=" + popup);
};

exports.logout = logout;

var startKakaoLogin = function startKakaoLogin(req, res) {
  var baseUri = "https://kauth.kakao.com/oauth/authorize";
  var config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URL,
    response_type: "code",
    scope: "account_email"
  };
  var params = new URLSearchParams(config).toString();
  var finalUri = "".concat(baseUri, "?").concat(params);
  return res.redirect(finalUri);
};

exports.startKakaoLogin = startKakaoLogin;

var finishKakaoLogin = function finishKakaoLogin(req, res) {
  var baseUri, config, params, finalUri, tokenRequest, access_token, userData, user;
  return regeneratorRuntime.async(function finishKakaoLogin$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          baseUri = "https://kauth.kakao.com/oauth/token";
          config = {
            client_id: process.env.KAKAO_CLIENT_ID,
            redirect_uri: process.env.KAKAO_REDIRECT_URL,
            grant_type: "authorization_code",
            code: req.query.code,
            client_secret: process.env.KAKAO_CLIENT_SECRET
          };
          params = new URLSearchParams(config).toString();
          finalUri = "".concat(baseUri, "?").concat(params);
          _context9.t0 = regeneratorRuntime;
          _context9.next = 7;
          return regeneratorRuntime.awrap((0, _crossFetch["default"])(finalUri, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
              "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
          }));

        case 7:
          _context9.t1 = _context9.sent.json();
          _context9.next = 10;
          return _context9.t0.awrap.call(_context9.t0, _context9.t1);

        case 10:
          tokenRequest = _context9.sent;

          if (!("access_token" in tokenRequest)) {
            _context9.next = 33;
            break;
          }

          access_token = tokenRequest.access_token;
          _context9.t2 = regeneratorRuntime;
          _context9.next = 16;
          return regeneratorRuntime.awrap((0, _crossFetch["default"])("https://kapi.kakao.com/v2/user/me", {
            headers: {
              Authorization: "Bearer ".concat(access_token)
            }
          }));

        case 16:
          _context9.t3 = _context9.sent.json();
          _context9.next = 19;
          return _context9.t2.awrap.call(_context9.t2, _context9.t3);

        case 19:
          userData = _context9.sent;
          console.log(userData);
          _context9.next = 23;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: userData.kakao_account.email
          }));

        case 23:
          user = _context9.sent;

          if (user) {
            _context9.next = 28;
            break;
          }

          _context9.next = 27;
          return regeneratorRuntime.awrap(_User["default"].create({
            name: userData.properties.nickname,
            email: userData.kakao_account.email,
            password: "",
            socialOnly: true,
            phone: "",
            gender: "",
            birth: {
              year: "",
              month: "",
              date: ""
            },
            avatarUrl: userData.properties.profile_image
          }));

        case 27:
          user = _context9.sent;

        case 28:
          // 카카오톡으로 회원가입 한 회원이든, 이메일로 회원가입 한 회원이든,
          // 카카오톡으로 로그인 가능하도록 설정
          req.session.loggedIn = true;
          req.session.loggedInUser = user;
          return _context9.abrupt("return", res.redirect("/"));

        case 33:
          return _context9.abrupt("return", res.status(400).render("users/login", {
            pageTitle: "Login",
            errorMessage: "로그인에 실패하였습니다."
          }));

        case 34:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.finishKakaoLogin = finishKakaoLogin;

var startNaverLogin = function startNaverLogin(req, res) {
  var baseUri = "https://nid.naver.com/oauth2.0/authorize";
  var config = {
    response_type: "code",
    client_id: process.env.NAVER_CLIENT_ID,
    redirect_uri: process.env.NAVER_REDIRECT_URL,
    state: "STATE_STRING"
  };
  var params = new URLSearchParams(config).toString();
  var finalUri = "".concat(baseUri, "?").concat(params);
  return res.redirect(finalUri);
};

exports.startNaverLogin = startNaverLogin;

var finishNaverLogin = function finishNaverLogin(req, res) {
  var baseUri, config, params, finalUri, tokenRequest, access_token, userData, user;
  return regeneratorRuntime.async(function finishNaverLogin$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          baseUri = "https://nid.naver.com/oauth2.0/token";
          config = {
            client_id: process.env.NAVER_CLIENT_ID,
            client_secret: process.env.NAVER_CLIENT_SECRET,
            grant_type: "authorization_code",
            code: req.query.code,
            state: req.query.state
          };
          params = new URLSearchParams(config).toString();
          finalUri = "".concat(baseUri, "?").concat(params);
          _context10.t0 = regeneratorRuntime;
          _context10.next = 7;
          return regeneratorRuntime.awrap((0, _crossFetch["default"])(finalUri, {
            method: "POST",
            headers: {
              Accept: "application/json"
            }
          }));

        case 7:
          _context10.t1 = _context10.sent.json();
          _context10.next = 10;
          return _context10.t0.awrap.call(_context10.t0, _context10.t1);

        case 10:
          tokenRequest = _context10.sent;

          if (!("access_token" in tokenRequest)) {
            _context10.next = 32;
            break;
          }

          access_token = tokenRequest.access_token;
          _context10.t2 = regeneratorRuntime;
          _context10.next = 16;
          return regeneratorRuntime.awrap((0, _crossFetch["default"])("https://openapi.naver.com/v1/nid/me", {
            headers: {
              Authorization: "Bearer ".concat(access_token)
            }
          }));

        case 16:
          _context10.t3 = _context10.sent.json();
          _context10.next = 19;
          return _context10.t2.awrap.call(_context10.t2, _context10.t3);

        case 19:
          userData = _context10.sent;
          _context10.next = 22;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: userData.response.email
          }));

        case 22:
          user = _context10.sent;

          if (user) {
            _context10.next = 27;
            break;
          }

          _context10.next = 26;
          return regeneratorRuntime.awrap(_User["default"].create({
            name: userData.response.name,
            email: userData.response.email,
            password: "",
            socialOnly: true,
            phone: userData.response.mobile,
            gender: "",
            birth: {
              year: "",
              month: "",
              date: ""
            },
            avatarUrl: userData.response.profile_image
          }));

        case 26:
          user = _context10.sent;

        case 27:
          req.session.loggedIn = true;
          req.session.loggedInUser = user;
          return _context10.abrupt("return", res.redirect("/"));

        case 32:
          return _context10.abrupt("return", res.status(400).render("users/login", {
            pageTitle: "Login",
            errorMessage: "로그인에 실패하였습니다."
          }));

        case 33:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.finishNaverLogin = finishNaverLogin;

var getEditUser = function getEditUser(req, res) {
  return regeneratorRuntime.async(function getEditUser$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          return _context11.abrupt("return", res.render("users/editUser", {
            pageTitle: "Profile"
          }));

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
};

exports.getEditUser = getEditUser;

var postEditUser = function postEditUser(req, res) {
  var _req$session$loggedIn, _id, avatarUrl, _req$body5, name, email, phone, year, month, date, file, exists, existingUser, isHeroku, updatedUser;

  return regeneratorRuntime.async(function postEditUser$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          req.session.editAlert = null;
          _req$session$loggedIn = req.session.loggedInUser, _id = _req$session$loggedIn._id, avatarUrl = _req$session$loggedIn.avatarUrl, _req$body5 = req.body, name = _req$body5.name, email = _req$body5.email, phone = _req$body5.phone, year = _req$body5.year, month = _req$body5.month, date = _req$body5.date, file = req.file; // console.log("id:", _id);
          // console.log("req.body: ", req.body);
          // console.log(file);
          // req.session.loggedInUser.email 제외하고
          // 다른 유저와 동일한 email 계정을 입력한 경우

          _context12.next = 4;
          return regeneratorRuntime.awrap(_User["default"].exists({
            email: email
          }));

        case 4:
          exists = _context12.sent;
          _context12.next = 7;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 7:
          existingUser = _context12.sent;

          if (!(exists && String(existingUser._id) !== req.session.loggedInUser._id)) {
            _context12.next = 10;
            break;
          }

          return _context12.abrupt("return", res.status(404).render("users/editUser", {
            editAlert: "이미 존재하는 이메일 계정입니다."
          }));

        case 10:
          isHeroku = process.env.NODE_ENV === "production";
          _context12.next = 13;
          return regeneratorRuntime.awrap(_User["default"].findByIdAndUpdate(_id, {
            name: name,
            email: email,
            phone: phone,
            birth: {
              year: year,
              month: month,
              date: date
            },
            avatarUrl: file ? isHeroku ? file.location : "/" + file.path : avatarUrl
          }, {
            "new": true
          }));

        case 13:
          updatedUser = _context12.sent;
          // console.log(req.file.path);
          // console.log("updateUser: ", updatedUser);
          // req.session.loggedIn = true;
          req.session.loggedInUser = updatedUser;
          return _context12.abrupt("return", res.redirect("/users/edit"));

        case 16:
        case "end":
          return _context12.stop();
      }
    }
  });
};

exports.postEditUser = postEditUser;

var getEditPW = function getEditPW(req, res) {
  // 소셜 로그인한 유저의 경우 비밀번호 설정하지 않았으므로 수정 기능 불필요
  if (req.session.loggedInUser.socialOnly === true) {
    return res.status(400).render("users/editUser");
  }

  return res.render("users/editPW", {
    pageTitle: "Profile"
  });
};

exports.getEditPW = getEditPW;

var postEditPW = function postEditPW(req, res) {
  var pageTitle, _req$session$loggedIn2, _id, password, _req$body6, oldPassword, newPassword, newPasswordConfirm, match, regPass, newPassword2, popup;

  return regeneratorRuntime.async(function postEditPW$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          pageTitle = "Profile";
          _req$session$loggedIn2 = req.session.loggedInUser, _id = _req$session$loggedIn2._id, password = _req$session$loggedIn2.password, _req$body6 = req.body, oldPassword = _req$body6.oldPassword, newPassword = _req$body6.newPassword, newPasswordConfirm = _req$body6.newPasswordConfirm; // console.log(req.body);
          // 현재 비밀번호 올바르게 입력했는지 확인

          _context13.next = 4;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(oldPassword, password));

        case 4:
          match = _context13.sent;

          if (match) {
            _context13.next = 7;
            break;
          }

          return _context13.abrupt("return", res.status(400).render("users/editPW", {
            pageTitle: pageTitle,
            uncorrectError: "비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
            newPassword: newPassword,
            newPasswordConfirm: newPasswordConfirm
          }));

        case 7:
          regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

          if (regPass.test(newPassword)) {
            _context13.next = 10;
            break;
          }

          return _context13.abrupt("return", res.status(400).render("users/editPW", {
            pageTitle: pageTitle,
            newPassError: "비밀번호는 영문, 숫자 조합으로 8-20자리 입력해주세요",
            oldPassword: oldPassword
          }));

        case 10:
          if (!(newPassword !== newPasswordConfirm)) {
            _context13.next = 12;
            break;
          }

          return _context13.abrupt("return", res.status(400).render("users/editPW", {
            pageTitle: pageTitle,
            notMatchError: "비밀번호가 일치하지 않습니다. 입력하신 내용을 다시 확인해주세요.",
            oldPassword: oldPassword,
            newPassword: newPassword
          }));

        case 12:
          _context13.next = 14;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(newPassword, 5));

        case 14:
          newPassword2 = _context13.sent;
          _context13.prev = 15;
          _context13.next = 18;
          return regeneratorRuntime.awrap(_User["default"].findByIdAndUpdate(_id, {
            password: newPassword2
          }));

        case 18:
          popup = encodeURIComponent("비밀번호를 변경했습니다. 다시 로그인해주세요."); // console.log();

          return _context13.abrupt("return", res.redirect("/logout?popup=" + popup));

        case 22:
          _context13.prev = 22;
          _context13.t0 = _context13["catch"](15);
          console.log(_context13.t0);
          return _context13.abrupt("return", res.status(400).render("users/editPW", {
            errorMessage: "\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uC790\uC138\uD55C \uC5D0\uB7EC\uB294 \uB2E4\uC74C\uACFC \uAC19\uC2B5\uB2C8\uB2E4. ".concat(_context13.t0._message)
          }));

        case 26:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[15, 22]]);
};

exports.postEditPW = postEditPW;

var deleteUser = function deleteUser(req, res) {
  var user, popup;
  return regeneratorRuntime.async(function deleteUser$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          user = req.session.loggedInUser;
          _context14.next = 3;
          return regeneratorRuntime.awrap(_User["default"].findByIdAndRemove(user._id));

        case 3:
          req.session.loggedIn = false;
          req.session.loggedInUser = null;
          popup = encodeURIComponent("유쓰계정 탈퇴가 완료되었습니다. \n그동안 유쓰 서비스를 이용해주셔서 감사합니다.");
          return _context14.abrupt("return", res.redirect("/?popup=" + popup));

        case 7:
        case "end":
          return _context14.stop();
      }
    }
  });
};

exports.deleteUser = deleteUser;