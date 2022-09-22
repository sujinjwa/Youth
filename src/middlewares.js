// 모든 템플릿에서 사용 가능한 전역 변수 선언
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  // res.locals.loggedIn = false;
  res.locals.loggedInUser = req.session.loggedInUser;
  res.locals.errorMessage = req.session.errorMessage;
  // req.session.errorMessage = null;
  // res.locals.errorMessage = null;
  //console.log(res.locals.loggedInUser);
  //console.log(res.locals.loggedIn);s
  //console.log(req.session);
  next();
};
