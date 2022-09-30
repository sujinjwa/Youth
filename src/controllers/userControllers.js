import User from "../model/User";
import fetch from "cross-fetch";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
// import { smtpTransport } from "../../config/email";

export const getJoin = (req, res) => {
  // let location;

  // if (typeof document !== "undefined") {
  //   location = document.location;
  // }
  // const emailBtn = location.querySelector(".send__email");

  // emailBtn.addEventListener("click", main);

  return res.render("users/join", { pageTitle: "Join" });
};

let sendingEmail, sentNumber;

// 이메일 전송 함수
const sendMail = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const pageTitle = "Join";
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser.socialOnly === true) {
      // 해당 계정으로 카카오톡 혹은 네이버로 이미 회원가입한 유저라면
      req.session.loggedIn = true;
      req.session.loggedInUser = existingUser;
      req.session.errorMessage =
        "이미 카카오톡 혹은 네이버로 회원가입한 계정입니다.";
      return res.redirect("/");
    }
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "이미 사용중인 이메일입니다.",
    });
  }

  // min ~ max 까지 랜덤으로 숫자 생성하는 함수
  const generateRandom = (min, max) => {
    let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
  };

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
    return res.render("users/join", { pageTitle: "Join", email });
  }

  main();

  // return res.render("users/join", { pageTitle: "Join", email });
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
    sendMail(req, res);
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
      errorMessage: "인증번호가 일치하지 않습니다",
    });
  }

  // +) 비밀번호 조합 숫자 + 영어로!

  if (password != passwordConfirm) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다",
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
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: `알 수 없는 에러가 발생했습니다. 자세한 에러는 다음과 같습니다. "${error._message}"`,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("users/login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const pageTitle = "Login";

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage:
        "일치하는 이메일 계정을 찾을 수 없습니다. 입력하신 내용을 다시 확인해주세요.",
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

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
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

export const getEdit = async (req, res) => {
  //const user = await User.findOne({ email: req.session.loggedInUser.email });
  return res.render("users/editUser", {
    pageTitle: "Profile",
  });
};

export const postEdit = async (req, res) => {
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
      avatarUrl: file ? "/" + file.path : avatarUrl,
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
    // console.log();
    return res.redirect("/logout");
  } catch (error) {
    console.log(error);
    return res.status(400).render("users/editPW", {
      errorMessage: `알 수 없는 에러가 발생했습니다. 자세한 에러는 다음과 같습니다. ${error._message}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  // 정말 삭제하시겠습니까? 모달 창 추가
  const user = req.session.loggedInUser;

  await User.findByIdAndRemove(user._id);

  req.session.loggedIn = false;
  req.session.loggedInUser = null;
  return res.redirect("/");
};
