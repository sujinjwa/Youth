"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startNaverLogin = exports.startKakaoLogin = exports.postLogin = exports.postJoin = exports.postEditPW = exports.postEdit = exports.logout = exports.getLogin = exports.getJoin = exports.getEditPW = exports.getEdit = exports.finishNaverLogin = exports.finishKakaoLogin = exports.deleteUser = void 0;

var _User = _interopRequireDefault(require("../model/User"));

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import { smtpTransport } from "../../config/email";
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
var sendingEmail, sentNumber; // 이메일 전송 함수

var sendMail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var email, pageTitle, existingUser, generateRandom, main, _main;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _main = function _main3() {
              _main = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var number, transporter, mailOptions;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
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
                          email: email
                        }));

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _main.apply(this, arguments);
            };

            main = function _main2() {
              return _main.apply(this, arguments);
            };

            email = req.body.email;
            console.log(email);
            pageTitle = "Join";
            _context2.next = 7;
            return _User["default"].findOne({
              email: email
            });

          case 7:
            existingUser = _context2.sent;

            if (!existingUser) {
              _context2.next = 12;
              break;
            }

            if (!(existingUser.socialOnly === true)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(400).render("users/join", {
              pageTitle: pageTitle,
              errorMessage: "\uC774\uBBF8 \uCE74\uCE74\uC624\uD1A1 \uD639\uC740 \uB124\uC774\uBC84\uB85C \uD68C\uC6D0\uAC00\uC785\uD55C \uACC4\uC815\uC785\uB2C8\uB2E4. \n \uD574\uB2F9 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD574\uC8FC\uC138\uC694."
            }));

          case 11:
            return _context2.abrupt("return", res.status(400).render("users/join", {
              pageTitle: pageTitle,
              errorMessage: "이미 사용중인 이메일입니다."
            }));

          case 12:
            // min ~ max 까지 랜덤으로 숫자 생성하는 함수
            generateRandom = function generateRandom(min, max) {
              var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
              return ranNum;
            };

            main(); // return res.render("users/join", { pageTitle: "Join", email });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendMail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var postJoin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, selfAuthenti, name, password, passwordConfirm, email, gender, year, month, date, pageTitle, regPass;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, selfAuthenti = _req$body.selfAuthenti, name = _req$body.name, password = _req$body.password, passwordConfirm = _req$body.passwordConfirm, email = _req$body.email, gender = _req$body.gender, year = _req$body.year, month = _req$body.month, date = _req$body.date; // console.log(req.body);
            //if ((!name && email) || (!password && email) || (!selfAuthenti && email)) {
            //if (email || !(email === undefined)) {

            if (!email) {
              _context3.next = 4;
              break;
            }

            sendMail(req, res);
            return _context3.abrupt("return");

          case 4:
            // console.log("email:", email);
            // console.log("글로벌 값 sendingEmail: ", sendingEmail);
            // console.log("글로벌 값: ", sentNumber, typeof sentNumber);
            // console.log("유저가 받아서 입력한 값: ", selfAuthenti, typeof selfAuthenti);
            pageTitle = "Join";

            if (!(sentNumber != Number(selfAuthenti))) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(400).render("users/join", {
              pageTitle: pageTitle,
              errorMessage: "인증번호가 일치하지 않습니다"
            }));

          case 7:
            // +) 비밀번호 조합 숫자 + 영어로! 8자리 이상!
            // let regPass = /^(?=[a-zA-Z0-9]{8,20}$/;
            regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

            if (regPass.test(password)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(400).render("users/join", {
              pageTitle: pageTitle,
              errorMessage: "비밀번호는 영문, 숫자 조합으로 8-20자리 입력해주세요"
            }));

          case 10:
            if (!(password != passwordConfirm)) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", res.status(400).render("users/join", {
              pageTitle: pageTitle,
              errorMessage: "비밀번호가 일치하지 않습니다"
            }));

          case 12:
            _context3.prev = 12;
            _context3.next = 15;
            return _User["default"].create({
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
              avatarUrl: "/uploads/avatars/basic_profile.jpg",
              socialOnly: false
            });

          case 15:
            return _context3.abrupt("return", res.redirect("/login"));

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](12);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(400).render("users/join", {
              pageTitle: pageTitle,
              errorMessage: "\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uC790\uC138\uD55C \uC5D0\uB7EC\uB294 \uB2E4\uC74C\uACFC \uAC19\uC2B5\uB2C8\uB2E4. \"".concat(_context3.t0._message, "\"")
            }));

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[12, 18]]);
  }));

  return function postJoin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render("users/login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body2, email, password, pageTitle, user, match;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            pageTitle = "Login";
            _context4.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context4.sent;

            if (user) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(400).render("users/login", {
              pageTitle: pageTitle,
              errorMessage: "가입되어 있지 않은 이메일 주소입니다."
            }));

          case 7:
            _context4.next = 9;
            return _bcrypt["default"].compare(password, user.password);

          case 9:
            match = _context4.sent;

            if (match) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", res.status(400).render("users/login", {
              pageTitle: pageTitle,
              errorMessage: "비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
            }));

          case 12:
            // req.session 객체에 로그인한 유저 정보 추가
            req.session.loggedIn = true;
            req.session.loggedInUser = user;
            return _context4.abrupt("return", res.redirect("/"));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.session.destroy();
  return res.redirect("/");
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

var finishKakaoLogin = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var baseUri, config, params, finalUri, tokenRequest, access_token, userData, user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
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
            _context5.next = 6;
            return (0, _crossFetch["default"])(finalUri, {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });

          case 6:
            _context5.next = 8;
            return _context5.sent.json();

          case 8:
            tokenRequest = _context5.sent;

            if (!("access_token" in tokenRequest)) {
              _context5.next = 29;
              break;
            }

            access_token = tokenRequest.access_token;
            _context5.next = 13;
            return (0, _crossFetch["default"])("https://kapi.kakao.com/v2/user/me", {
              headers: {
                Authorization: "Bearer ".concat(access_token)
              }
            });

          case 13:
            _context5.next = 15;
            return _context5.sent.json();

          case 15:
            userData = _context5.sent;
            console.log(userData);
            _context5.next = 19;
            return _User["default"].findOne({
              email: userData.kakao_account.email
            });

          case 19:
            user = _context5.sent;

            if (user) {
              _context5.next = 24;
              break;
            }

            _context5.next = 23;
            return _User["default"].create({
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
            });

          case 23:
            user = _context5.sent;

          case 24:
            // 카카오톡으로 회원가입 한 회원이든, 이메일로 회원가입 한 회원이든,
            // 카카오톡으로 로그인 가능하도록 설정
            req.session.loggedIn = true;
            req.session.loggedInUser = user;
            return _context5.abrupt("return", res.redirect("/"));

          case 29:
            return _context5.abrupt("return", res.status(400).render("users/login", {
              pageTitle: "Login",
              errorMessage: "로그인에 실패하였습니다."
            }));

          case 30:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function finishKakaoLogin(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

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

var finishNaverLogin = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var baseUri, config, params, finalUri, tokenRequest, access_token, userData, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
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
            _context6.next = 6;
            return (0, _crossFetch["default"])(finalUri, {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });

          case 6:
            _context6.next = 8;
            return _context6.sent.json();

          case 8:
            tokenRequest = _context6.sent;

            if (!("access_token" in tokenRequest)) {
              _context6.next = 28;
              break;
            }

            access_token = tokenRequest.access_token;
            _context6.next = 13;
            return (0, _crossFetch["default"])("https://openapi.naver.com/v1/nid/me", {
              headers: {
                Authorization: "Bearer ".concat(access_token)
              }
            });

          case 13:
            _context6.next = 15;
            return _context6.sent.json();

          case 15:
            userData = _context6.sent;
            _context6.next = 18;
            return _User["default"].findOne({
              email: userData.response.email
            });

          case 18:
            user = _context6.sent;

            if (user) {
              _context6.next = 23;
              break;
            }

            _context6.next = 22;
            return _User["default"].create({
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
            });

          case 22:
            user = _context6.sent;

          case 23:
            req.session.loggedIn = true;
            req.session.loggedInUser = user;
            return _context6.abrupt("return", res.redirect("/"));

          case 28:
            return _context6.abrupt("return", res.status(400).render("users/login", {
              pageTitle: "Login",
              errorMessage: "로그인에 실패하였습니다."
            }));

          case 29:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function finishNaverLogin(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.finishNaverLogin = finishNaverLogin;

var getEdit = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", res.render("users/editUser", {
              pageTitle: "Profile"
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getEdit(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$session$loggedIn, _id, avatarUrl, _req$body3, name, email, phone, year, month, date, file, exists, existingUser, updatedUser;

    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            req.session.editAlert = null;
            _req$session$loggedIn = req.session.loggedInUser, _id = _req$session$loggedIn._id, avatarUrl = _req$session$loggedIn.avatarUrl, _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, phone = _req$body3.phone, year = _req$body3.year, month = _req$body3.month, date = _req$body3.date, file = req.file; // console.log("id:", _id);
            // console.log("req.body: ", req.body);
            // console.log(file);
            // req.session.loggedInUser.email 제외하고
            // 다른 유저와 동일한 email 계정을 입력한 경우

            _context8.next = 4;
            return _User["default"].exists({
              email: email
            });

          case 4:
            exists = _context8.sent;
            _context8.next = 7;
            return _User["default"].findOne({
              email: email
            });

          case 7:
            existingUser = _context8.sent;

            if (!(exists && String(existingUser._id) !== req.session.loggedInUser._id)) {
              _context8.next = 10;
              break;
            }

            return _context8.abrupt("return", res.status(404).render("users/editUser", {
              editAlert: "이미 존재하는 이메일 계정입니다."
            }));

          case 10:
            _context8.next = 12;
            return _User["default"].findByIdAndUpdate(_id, {
              name: name,
              email: email,
              phone: phone,
              birth: {
                year: year,
                month: month,
                date: date
              },
              avatarUrl: file ? "/" + file.path : avatarUrl
            }, {
              "new": true
            });

          case 12:
            updatedUser = _context8.sent;
            // console.log(req.file.path);
            // console.log("updateUser: ", updatedUser);
            // req.session.loggedIn = true;
            req.session.loggedInUser = updatedUser;
            return _context8.abrupt("return", res.redirect("/users/edit"));

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function postEdit(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

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

var postEditPW = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var pageTitle, _req$session$loggedIn2, _id, password, _req$body4, oldPassword, newPassword, newPasswordConfirm, match, regPass, newPassword2;

    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            pageTitle = "Profile";
            _req$session$loggedIn2 = req.session.loggedInUser, _id = _req$session$loggedIn2._id, password = _req$session$loggedIn2.password, _req$body4 = req.body, oldPassword = _req$body4.oldPassword, newPassword = _req$body4.newPassword, newPasswordConfirm = _req$body4.newPasswordConfirm; // console.log(req.body);
            // 현재 비밀번호 올바르게 입력했는지 확인

            _context9.next = 4;
            return _bcrypt["default"].compare(oldPassword, password);

          case 4:
            match = _context9.sent;

            if (match) {
              _context9.next = 7;
              break;
            }

            return _context9.abrupt("return", res.status(400).render("users/editPW", {
              pageTitle: pageTitle,
              uncorrectError: "비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
            }));

          case 7:
            if (!(newPassword !== newPasswordConfirm)) {
              _context9.next = 9;
              break;
            }

            return _context9.abrupt("return", res.status(400).render("users/editPW", {
              notMatchError: "비밀번호가 일치하지 않습니다. 입력하신 내용을 다시 확인해주세요."
            }));

          case 9:
            regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

            if (regPass.test(password)) {
              _context9.next = 12;
              break;
            }

            return _context9.abrupt("return", res.status(400).render("users/editPW", {
              pageTitle: pageTitle,
              newPassError: "비밀번호는 영문, 숫자 조합으로 8-20자리 입력해주세요"
            }));

          case 12:
            _context9.next = 14;
            return _bcrypt["default"].hash(newPassword, 5);

          case 14:
            newPassword2 = _context9.sent;
            _context9.prev = 15;
            _context9.next = 18;
            return _User["default"].findByIdAndUpdate(_id, {
              password: newPassword2
            });

          case 18:
            return _context9.abrupt("return", res.redirect("/logout"));

          case 21:
            _context9.prev = 21;
            _context9.t0 = _context9["catch"](15);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(400).render("users/editPW", {
              errorMessage: "\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uC790\uC138\uD55C \uC5D0\uB7EC\uB294 \uB2E4\uC74C\uACFC \uAC19\uC2B5\uB2C8\uB2E4. ".concat(_context9.t0._message)
            }));

          case 25:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[15, 21]]);
  }));

  return function postEditPW(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.postEditPW = postEditPW;

var deleteUser = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            // 정말 삭제하시겠습니까? 모달 창 추가
            user = req.session.loggedInUser;
            _context10.next = 3;
            return _User["default"].findByIdAndRemove(user._id);

          case 3:
            req.session.loggedIn = false;
            req.session.loggedInUser = null;
            return _context10.abrupt("return", res.redirect("/"));

          case 6:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function deleteUser(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;