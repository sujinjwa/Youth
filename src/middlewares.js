import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

// 모든 템플릿에서 사용 가능한 전역 변수 선언
export const localsMiddleware = (req, res, next) => {
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

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "writeyouth",
  Key: "images/",
  acl: "public-read",
});

const isHeroku = process.env.NODE_ENV === "production";

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  storage: isHeroku ? s3ImageUploader : undefined,
});

// 로그인되지 않은 유저 차단하는 미들웨어
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    // req.session.errorMessage1 = "로그인이 필요한 서비스입니다.";
    return res.redirect("/login");
  }
};

// 로그인된 유저 차단하는 미들웨어
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

// 회원 탈퇴 이전에 경고창 띄우는 미들웨어
export const beforeDeleteUser = (req, res) => {
  return res.render("users/beforeDeleteUser", { pageTitle: "DeleteUser" });
  // next();
};
