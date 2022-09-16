import User from "../model/User";
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
  req.session.user = user;

  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
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
