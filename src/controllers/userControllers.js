import User from "../model/User";
import fetch from "cross-fetch";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import querystring from "querystring";
// import { smtpTransport } from "../../config/email";

// min ~ max 까지 랜덤으로 숫자 생성하는 함수
const generateRandom = (min, max) => {
  let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

// 전송한 이메일과 인증번호 확인하기 위한 변수
let sendingEmail, sentNumber;

// 이메일 전송 함수
const sendMailForJoin = async (req, res) => {
  const { email } = req.body;

  const pageTitle = "Join";
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser.socialOnly === true) {
      // 해당 계정으로 카카오톡 혹은 네이버로 이미 회원가입한 유저라면
      return res.status(400).render("users/join", {
        pageTitle,
        popup: `이미 카카오톡 혹은 네이버로 회원가입한 계정입니다. \n 해당 계정으로 로그인해주세요.`,
      });
    }
    return res.status(400).render("users/join", {
      pageTitle,
      popup: "이미 사용중인 이메일입니다.",
    });
  }

  async function main() {
    let number = generateRandom(111111, 999999); // 인증번호
    sentNumber = number;
    //let testAccount = await nodemailer.createTestAccount();
    // nodemailer 전송기 생성 (메일 발송 서비스에 대한 환경 설정)
    let transporter = nodemailer.createTransport({
      server: "naver",
      host: "smtp.naver.com", // SMTP 서버명
      port: 587, // SMTP 포트
      // secure: false,
      auth: {
        user: process.env.NODEMAILER_USER, // 보내는 사람의 이메일 계정 아이디
        pass: process.env.NODEMAILER_PASS, // 보내는 사람의 이메일 계정 비밀번호
      },
    });

    // 메시지 옵션 설정
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email, // 사용자의 아이디
      subject: "[유언을쓰다] 이메일 인증 안내입니다.", // 이메일 제목
      html: `<div style="display:flex; flex-direction:column; justify-content:center; align-items:center; margin:0 auto; width:475px">
                <div style="display:flex; align-items:center; margin: 20px">
                  <img src="https://tumblbug-upi.imgix.net/330fc16f-de5c-4d76-bbeb-a477519c3f29.png?auto=format%2Ccompress&ch=Save-Data&facepad=2.0&fit=facearea&h=200&mask=ellipse&w=200&s=4a832561eefefc964968a6ea17e7fc24" style="width:60px" alt="" />
                  <h1 style="margin-left: 20px; font-size:28px">인증번호를 알려드립니다.</h1>
                </div>
                <hr style="width:100%; margin-bottom: 30px" />
                <h3>안녕하세요. 유언을 쓰다에 가입해주셔서 감사합니다.</h3>
                <p>유언을 쓰다에 등록한 메일주소가 올바른지 확인하기 위한 메일입니다.</p>
              
                <h1 style="font-size:50px">${number}</h1>
              
                <p>회원 가입 페이지로 돌아가 인증키를 직접 입력하시거나</p>
                <p>인증키를 복사 후 붙여넣기하여 가입을 진행해주시기 바랍니다.</p>

                <hr style="width:100%; margin-top: 30px" />
                <p style="margin-top: 10px">이 메일은 발신 전용으로 회신이 되지 않습니다.</p>
                <p>궁금하신 사항은 nasujin744@naver.com로 문의해 주시기 바랍니다.</p>
            </div>`,
      // text: "오른쪽 숫자 6자리를 입력해주세요: " + number,
    };

    // sendMail() 메서드 사용하여 메시지 전송
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        // return res.status(400).render("users/join", {
        //   pageTitle,
        //   errorMessage: `이메일 전송에 실패했습니다. 회원가입을 다시 시도해주세요. "${error._message}"`,
        // });
      } else {
        console.log("성공적으로 이메일 전송했습니다.", info.response);
        transporter.close();
      }
    });
    sendingEmail = email;
    return res.render("users/join", {
      pageTitle: "Join",
      email,
      popup: `해당 이메일 계정으로 인증번호를 전송했습니다.`,
    });
  }

  main();

  // return res.render("users/join", { pageTitle: "Join", email });
};

const sendMailForFindPW = async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.exists({ email });
  if (!existingUser) {
    return res.status(400).render("users/findPW", {
      pageTitle: "Find Password",
      popup: "가입된 계정이 아닙니다.",
    });
  }

  async function main() {
    let number = generateRandom(111111, 999999);
    sentNumber = number;

    let transporter = nodemailer.createTransport({
      server: "naver",
      host: "smtp.naver.com",
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "[유언을쓰다] 이메일 인증 안내입니다.",
      html: `<div style="display:flex; flex-direction:column; justify-content:center; align-items:center; margin:0 auto; width:475px">
                  <div style="display:flex; align-items:center; margin: 20px">
                    <img src="https://tumblbug-upi.imgix.net/330fc16f-de5c-4d76-bbeb-a477519c3f29.png?auto=format%2Ccompress&ch=Save-Data&facepad=2.0&fit=facearea&h=200&mask=ellipse&w=200&s=4a832561eefefc964968a6ea17e7fc24" style="width:60px" alt="" />
                    <h1 style="margin-left: 20px; font-size:28px">인증번호를 알려드립니다.</h1>
                  </div>
                  <hr style="width:100%; margin-bottom: 30px" />
                  <h3>비밀번호 재설정을 위해 사용자 확인을 진행합니다.</h3>
                
                  <h1 style="font-size:50px">${number}</h1>
                
                  <p>비밀번호 찾기 페이지로 돌아가 인증키를 직접 입력하시거나</p>
                  <p>인증키를 복사 후 붙여넣기하여 비밀번호 재설정을 진행해주시기 바랍니다.</p>

                  <hr style="width:100%; margin-top: 30px" />
                  <p style="margin-top: 10px">이 메일은 발신 전용으로 회신이 되지 않습니다.</p>
                  <p>궁금하신 사항은 nasujin744@naver.com로 문의해 주시기 바랍니다.</p>
              </div>`,
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
    return res.render("users/findPW", {
      pageTitle: "Find Password",
      email,
      popup: "해당 이메일 계정으로 인증번호를 전송했습니다.",
    });
  }

  main();
};

export const getJoin = (req, res) => {
  // let location;

  // if (typeof document !== "undefined") {
  //   location = document.location;
  // }
  // const emailBtn = location.querySelector(".send__email");

  // emailBtn.addEventListener("click", main);

  return res.render("users/join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  let {
    selfAuthenti,
    name,
    password,
    passwordConfirm,
    email,
    gender,
    year,
    month,
    date,
  } = req.body;

  // console.log(req.body);

  //if ((!name && email) || (!password && email) || (!selfAuthenti && email)) {
  //if (email || !(email === undefined)) {
  if (email) {
    sendMailForJoin(req, res);
    return; // 이걸 해줘야 되구나...
    // return res.render("users/join", { pageTitle: "Join", email });
  }

  // console.log("email:", email);
  // console.log("글로벌 값 sendingEmail: ", sendingEmail);
  // console.log("글로벌 값: ", sentNumber, typeof sentNumber);
  // console.log("유저가 받아서 입력한 값: ", selfAuthenti, typeof selfAuthenti);
  const pageTitle = "Join";

  if (sentNumber != Number(selfAuthenti)) {
    return res.status(400).render("users/join", {
      pageTitle,
      popup: "인증번호가 일치하지 않습니다.",
    });
  }

  // +) 비밀번호 조합 숫자 + 영어로! 8자리 이상!
  // let regPass = /^(?=[a-zA-Z0-9]{8,20}$/;
  let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  if (!regPass.test(password)) {
    return res.status(400).render("users/join", {
      pageTitle,
      popup: "비밀번호는 영문, 숫자 조합으로 8-20자리 입력해주세요",
    });
  }

  if (password != passwordConfirm) {
    return res.status(400).render("users/join", {
      pageTitle,
      popup: "비밀번호가 일치하지 않습니다",
    });
  }

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

  try {
    await User.create({
      name,
      email: sendingEmail,
      password,
      phone: "",
      gender,
      birth: {
        year,
        month,
        date,
      },
      avatarUrl: "/uploads/avatars/basic_profile.jpg",
      socialOnly: false,
    });
    return res.redirect("/welcome");
  } catch (error) {
    console.log(error);
    return res.status(400).render("users/join", {
      pageTitle,
      popup: `알 수 없는 에러가 발생했습니다. \n자세한 에러는 다음과 같습니다. "${error._message}"`,
    });
  }
};

export const welcome = (req, res) => {
  return res.render("users/welcome", {
    pageTitle: "Finish Join",
  });
};

export const getLogin = (req, res) => {
  const popup = req.query.popup;
  return res.render("users/login", {
    pageTitle: "Login",
    popup,
  });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const pageTitle = "Login";

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "가입되어 있지 않은 이메일 주소입니다.",
    });
  }

  if (user.socialOnly === true) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage:
        "카카오톡 혹은 네이버로 가입한 계정입니다. 해당 계정으로 로그인해주세요.",
    });
  }

  //password = await bcrypt.hash(password, 5);
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage:
        "비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
    });
  }

  // req.session 객체에 로그인한 유저 정보 추가
  req.session.loggedIn = true;
  req.session.loggedInUser = user;

  return res.redirect("/");
};

export const getFindID = (req, res) => {
  return res.render("users/findID", { pageTitle: "Find ID" });
};

export const postFindID = async (req, res) => {
  const { name, year, month, date } = req.body;
  //console.log(name, year, month, date);

  const user = await User.findOne({ name, year, month, date });
  console.log(user);

  let query;
  // 조회되는 유저가 없는 경우
  if (user === null) {
    query = querystring.stringify({ name: null, email: null });
    return res.redirect("/login/showID?" + query);
  }

  query = querystring.stringify({
    name: user.name,
    email: user.email,
  });
  return res.redirect("/login/showID?" + query);
};

export const showID = (req, res) => {
  // const user = req.session.foundUser;
  // req.session.foundUser = null;
  const { name, email } = req.query;
  return res.render("users/showID", { name, email, pageTitle: "Show ID" });
};

export const getFindPW = (req, res) => {
  return res.render("users/findPW", { pageTitle: "Find Password" });
};

export const postFindPW = async (req, res) => {
  let { email, selfAuthenti, name, newPassword, newPasswordConfirm } = req.body;

  if (email) {
    sendMailForFindPW(req, res);
    return;
  }

  const pageTitle = "Find Password";

  if (sentNumber != Number(selfAuthenti)) {
    return res.status(400).render("users/findPW", {
      pageTitle,
      popup: "인증번호가 일치하지 않습니다.",
      email: sendingEmail,
    });
  }

  const existingUser = await User.findOne({ sendingEmail, name });
  if (!existingUser) {
    return res.status(400).render("users/findPW", {
      pageTitle,
      popup: "입력한 정보로 조회된 회원을 찾을 수 없습니다.",
      email: sendingEmail,
      selfAuthenti,
      name,
    });
  }

  let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  if (!regPass.test(newPassword)) {
    return res.status(400).render("users/findPW", {
      pageTitle,
      newPassError: "비밀번호는 영문, 숫자 조합으로 8-20자리 입력해주세요",
      email: sendingEmail,
      selfAuthenti,
      name,
    });
  }

  // 새 비밀번호와 새 비밀번호 확인값이 동일한지 확인
  if (newPassword !== newPasswordConfirm) {
    return res.status(400).render("users/findPW", {
      notMatchError:
        "비밀번호가 일치하지 않습니다. 입력하신 내용을 다시 확인해주세요.",
      email: sendingEmail,
      selfAuthenti,
      name,
    });
  }

  const newPassword2 = await bcrypt.hash(newPassword, 5);
  try {
    await User.findByIdAndUpdate(existingUser._id, {
      password: newPassword2,
    });

    const popup = encodeURIComponent(
      "비밀번호를 변경했습니다. 변경된 비밀번호로 로그인해주세요."
    );

    return res.redirect("/login?popup=" + popup);
  } catch (error) {
    console.log(error);
    return res.status(400).render("users/findPW", {
      errorMessage: `알 수 없는 에러가 발생했습니다. 자세한 에러는 다음과 같습니다. ${error._message}`,
    });
  }
};

export const logout = (req, res) => {
  let popup = req.query.popup; // 비밀번호 변경한 경우
  if (!popup) {
    // 그냥 로그아웃한 경우
    popup = "로그아웃되었습니다.";
  }
  req.session.destroy();
  return res.redirect("/?popup=" + popup);
};

export const startKakaoLogin = (req, res) => {
  const baseUri = "https://kauth.kakao.com/oauth/authorize";

  const config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URL,
    response_type: "code",
    scope: "account_email",
  };

  const params = new URLSearchParams(config).toString();
  const finalUri = `${baseUri}?${params}`;

  return res.redirect(finalUri);
};

export const finishKakaoLogin = async (req, res) => {
  const baseUri = "https://kauth.kakao.com/oauth/token";

  const config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URL,
    grant_type: "authorization_code",
    code: req.query.code,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
  };

  const params = new URLSearchParams(config).toString();
  const finalUri = `${baseUri}?${params}`;

  const tokenRequest = await (
    await fetch(finalUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const userData = await (
      await fetch(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    console.log(userData);

    let user = await User.findOne({
      email: userData.kakao_account.email,
    });

    if (!user) {
      user = await User.create({
        name: userData.properties.nickname,
        email: userData.kakao_account.email,
        password: "",
        socialOnly: true,
        phone: "",
        gender: "",
        birth: {
          year: "",
          month: "",
          date: "",
        },
        avatarUrl: userData.properties.profile_image,
      });
    }

    // 카카오톡으로 회원가입 한 회원이든, 이메일로 회원가입 한 회원이든,
    // 카카오톡으로 로그인 가능하도록 설정
    req.session.loggedIn = true;
    req.session.loggedInUser = user;
    return res.redirect("/");
    //return res.send(JSON.stringify(tokenRequest));
  } else {
    return res.status(400).render("users/login", {
      pageTitle: "Login",
      errorMessage: "로그인에 실패하였습니다.",
    });
  }

  // console.log(json);
  // res.send(JSON.stringify(json));
};

export const startNaverLogin = (req, res) => {
  const baseUri = "https://nid.naver.com/oauth2.0/authorize";

  const config = {
    response_type: "code",
    client_id: process.env.NAVER_CLIENT_ID,
    redirect_uri: process.env.NAVER_REDIRECT_URL,
    state: "STATE_STRING",
  };

  const params = new URLSearchParams(config).toString();
  const finalUri = `${baseUri}?${params}`;

  return res.redirect(finalUri);
};

export const finishNaverLogin = async (req, res) => {
  const baseUri = "https://nid.naver.com/oauth2.0/token";

  const config = {
    client_id: process.env.NAVER_CLIENT_ID,
    client_secret: process.env.NAVER_CLIENT_SECRET,
    grant_type: "authorization_code",
    code: req.query.code,
    state: req.query.state,
  };

  const params = new URLSearchParams(config).toString();
  const finalUri = `${baseUri}?${params}`;

  const tokenRequest = await (
    await fetch(finalUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const userData = await (
      await fetch(`https://openapi.naver.com/v1/nid/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    // console.log(userData);

    let user = await User.findOne({
      email: userData.response.email,
    });

    if (!user) {
      user = await User.create({
        name: userData.response.name,
        email: userData.response.email,
        password: "",
        socialOnly: true,
        phone: userData.response.mobile,
        gender: "",
        birth: {
          year: "",
          month: "",
          date: "",
        },
        avatarUrl: userData.response.profile_image,
      });
    }

    req.session.loggedIn = true;
    req.session.loggedInUser = user;
    return res.redirect("/");
    // return res.send(JSON.stringify(tokenRequest));
  } else {
    return res.status(400).render("users/login", {
      pageTitle: "Login",
      errorMessage: "로그인에 실패하였습니다.",
    });
  }
};

export const getEditUser = async (req, res) => {
  //const user = await User.findOne({ email: req.session.loggedInUser.email });
  return res.render("users/editUser", {
    pageTitle: "Profile",
  });
};

export const postEditUser = async (req, res) => {
  req.session.editAlert = null;
  const {
    session: {
      loggedInUser: { _id, avatarUrl },
    },
    body: { name, email, phone, year, month, date },
    file,
  } = req;
  // console.log("id:", _id);
  // console.log("req.body: ", req.body);
  // console.log(file);

  // req.session.loggedInUser.email 제외하고
  // 다른 유저와 동일한 email 계정을 입력한 경우
  const exists = await User.exists({ email });
  const existingUser = await User.findOne({ email });
  // console.log(exists);
  // console.log(existingUser);
  // console.log(req.session.loggedInUser._id);
  // console.log(String(existingUser._id) === req.session.loggedInUser._id);

  if (exists && String(existingUser._id) !== req.session.loggedInUser._id) {
    return res.status(404).render("users/editUser", {
      editAlert: "이미 존재하는 이메일 계정입니다.",
    });
  }
  const isHeroku = process.env.NODE_ENV === "production";

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      phone,
      birth: {
        year,
        month,
        date,
      },
      avatarUrl: file ? (isHeroku ? file.location : file.path) : avatarUrl,
    },
    { new: true }
  );

  // console.log(req.file.path);
  // console.log("updateUser: ", updatedUser);
  // req.session.loggedIn = true;
  req.session.loggedInUser = updatedUser;
  return res.redirect("/users/edit");
};

export const getEditPW = (req, res) => {
  // 소셜 로그인한 유저의 경우 비밀번호 설정하지 않았으므로 수정 기능 불필요
  if (req.session.loggedInUser.socialOnly === true) {
    return res.status(400).render("users/editUser");
  }
  return res.render("users/editPW", { pageTitle: "Profile" });
};

export const postEditPW = async (req, res) => {
  const pageTitle = "Profile";
  const {
    session: {
      loggedInUser: { _id, password },
    },
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;
  // console.log(req.body);

  // 현재 비밀번호 올바르게 입력했는지 확인
  const match = await bcrypt.compare(oldPassword, password);
  if (!match) {
    return res.status(400).render("users/editPW", {
      pageTitle,
      uncorrectError:
        "비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
    });
  }

  let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  if (!regPass.test(newPassword)) {
    return res.status(400).render("users/editPW", {
      pageTitle,
      newPassError: "비밀번호는 영문, 숫자 조합으로 8-20자리 입력해주세요",
    });
  }

  // 새 비밀번호와 새 비밀번호 확인값이 동일한지 확인
  if (newPassword !== newPasswordConfirm) {
    return res.status(400).render("users/editPW", {
      notMatchError:
        "비밀번호가 일치하지 않습니다. 입력하신 내용을 다시 확인해주세요.",
    });
  }

  const newPassword2 = await bcrypt.hash(newPassword, 5);
  try {
    await User.findByIdAndUpdate(_id, {
      password: newPassword2,
    });

    const popup = encodeURIComponent(
      "비밀번호를 변경했습니다. 다시 로그인해주세요."
    );
    // console.log();
    return res.redirect("/logout?popup=" + popup);
  } catch (error) {
    console.log(error);
    return res.status(400).render("users/editPW", {
      errorMessage: `알 수 없는 에러가 발생했습니다. 자세한 에러는 다음과 같습니다. ${error._message}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  const user = req.session.loggedInUser;

  await User.findByIdAndRemove(user._id);

  req.session.loggedIn = false;
  req.session.loggedInUser = null;

  const popup = encodeURIComponent(
    "유쓰계정 탈퇴가 완료되었습니다. \n그동안 유쓰 서비스를 이용해주셔서 감사합니다."
  );
  return res.redirect("/?popup=" + popup);
};
