import express from 'express';
import {
  home,
  about,
  youthkit,
  community,
} from '../controllers/contentControllers';
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  getFindID,
  postFindID,
  showID,
  getFindPW,
  postFindPW,
  logout,
  startKakaoLogin,
  finishKakaoLogin,
  startNaverLogin,
  finishNaverLogin,
  welcome,
} from '../controllers/userControllers';
import { protectorMiddleware, publicOnlyMiddleware } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get('/', home);
globalRouter.get('/about', about);
globalRouter.get('/youthkit', youthkit);
globalRouter.get('/community', protectorMiddleware, community);
globalRouter
  .route('/join')
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(postJoin);
globalRouter.get('/welcome', welcome);
globalRouter
  .route('/login')
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
globalRouter.get('/login/kakao/start', publicOnlyMiddleware, startKakaoLogin);
globalRouter.get('/login/kakao/finish', publicOnlyMiddleware, finishKakaoLogin);
globalRouter.get('/login/naver/start', publicOnlyMiddleware, startNaverLogin);
globalRouter.get('/login/naver/finish', publicOnlyMiddleware, finishNaverLogin);
globalRouter.get('/logout', protectorMiddleware, logout);
globalRouter
  .route('/login/findID')
  .all(publicOnlyMiddleware)
  .get(getFindID)
  .post(postFindID);
globalRouter.get('/login/showID', publicOnlyMiddleware, showID);
globalRouter
  .route('/login/findPW')
  .all(publicOnlyMiddleware)
  .get(getFindPW)
  .post(postFindPW);
// globalRouter.get("/login/findPW", findPW);

export default globalRouter;
