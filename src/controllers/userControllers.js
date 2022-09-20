import User from "../model/User";
import fetch from "cross-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("users/join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { email, password, passwordConfirm, name, phone } = req.body;
  const pageTitle = "Join";

  // 비밀번호 조합 숫자 + 영어로!
  if (password != passwordConfirm) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다",
    });
  }

  const exists = await User.exists({ email });
  if (exists) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "이미 사용중인 이메일입니다.",
    });
  }

  if (phone.includes("-")) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "휴대폰 번호가 형식에 맞지 않습니다.",
    });
  }
  // if (typeof phone !== ) {
  //   return res.status(400).render("users/join", {
  //     pageTitle,
  //     errorMessage: "휴대폰 번호가 형식에 맞지 않습니다.",
  //   });
  // }

  try {
    await User.create({
      name,
      email,
      password,
      phone,
    });
    return res.redirect("/login");
  } catch (error) {
    // console.log(error);
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: `알 수 없는 에러가 발생했습니다. 자세한 에러는 다음과 같습니다. "${error._message}"`,
    });
  } finally {
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

export const seeUser = (req, res) => {
  console.log(req.params.id);
  return res.render("users/seeUser");
};

export const editUser = (req, res) => {
  return res.render("users/editUser");
};

export const deleteUser = (req, res) => {
  return res.render("users/deleteUser");
};
