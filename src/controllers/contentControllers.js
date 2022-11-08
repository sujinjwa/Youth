import express from 'express';

export const home = (req, res) => {
  const popup = req.query.popup;
  return res.render('home', {
    pageTitle: 'Home',
    popup,
  });
};

export const about = (req, res) => {
  return res.render('contents/about', { pageTitle: 'About' });
};

export const youthkit = (req, res) => {
  return res.render('contents/youthkit');
};

export const community = (req, res) => {
  const popup = encodeURIComponent(
    '현재 커뮤니티 서비스 개발 중입니다. \n조금만 기다려주세요.'
  );
  return res.redirect('/?popup=' + popup);
};

export const qna = (req, res) => {
  const popup = req.query.popup;
  let id = req.params.id;
  return res.render(`contents/qna_${id}`, { pageTitle: 'QnA', popup });
};

export const detail = (req, res) => {
  return res.render('contents/detail', { pageTitle: '가이드북 플러스' });
};

const qrContents = [
  {
    title: '유골을 뿌리는 장례 방식',
    hashtags: '장례 • 장례방식',
    minutes: 3,
  },
  { title: '상황별 기증 가능 장기 종류', hashtags: '장기기증', minutes: 2 },
  {
    title: '부채와 상속',
    hashtags: '상속포기 • 빚 • 재산',
    minutes: 2,
  },
  {
    title: 'SNS 기념(추모)계정 전환방법',
    hashtags: '추모 • 디지털 기록',
    minutes: 4,
  },
  { title: '유품 처분 방법', hashtags: '유품 소각 • 유품 정리', minutes: 3 },
  {
    title: '반려동물 신탁제도(펫신탁)',
    hashtags: '반려동물 • 신탁 • 대리인',
    minutes: 2,
  },
];

export const qrPage = (req, res) => {
  const id = req.params.id;
  return res.render('contents/qrpage', {
    pageTitle: 'Contents',
    title: qrContents[id - 1].title,
    imgUrl: `/uploads/contents/${id}.jpg`,
  });
};

export const recommend = (req, res) => {
  const popup = encodeURIComponent(
    '현재 추천콘텐츠 서비스 개발 중입니다. \n조금만 기다려주세요.'
  );
  return res.redirect('/contents/qna/1?popup=' + popup);
};
