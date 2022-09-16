// 모든 템플릿에서 사용 가능한 전역 변수 선언
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  // console.log(res.locals.loggedInUser);
  next();
};
