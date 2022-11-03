import express from "express";

export const home = (req, res) => {
  const popup = req.query.popup;
  return res.render("home", {
    pageTitle: "Home",
    popup,
  });
};

export const about = (req, res) => {
  return res.render("contents/about", { pageTitle: "About" });
};

export const youthkit = (req, res) => {
  return res.render("contents/youthkit");
};

export const community = (req, res) => {
  const popup = encodeURIComponent(
    "현재 커뮤니티 서비스 개발 중입니다. \n조금만 기다려주세요."
  );
  return res.redirect("/?popup=" + popup);
};

export const qna = (req, res) => {
  const popup = req.query.popup;
  // console.log(req.params);
  let id = req.params.id;
  return res.render(`contents/qna_${id}`, { pageTitle: "QnA", popup });
};

export const detail = (req, res) => {
  return res.render("contents/detail", { pageTitle: "QR코드 렌더링" });
};

const qrContents = [
  { title: "유골을 뿌리는 장례 방식(산분장) 더 알아보기", hashtags: "장례" },
  { title: "장기기증 더 알아보기", hashtags: "장례 • 장기기증" },
  { title: "상속포기와 한정승인 더 알아보기", hashtags: "상속 • 재산" },
  { title: "SNS 기념(추모)계정 더 알아보기", hashtags: "장례" },
  { title: "유품 소각 관련 사항 더 알아보기", hashtags: "재산" },
  { title: "반려동물 신탁제도 더 알아보기", hashtags: "장례 • 재산" },
];

export const qrPage = (req, res) => {
  const id = req.params.id;
  return res.render("contents/qrpage", {
    pageTitle: "Contents",
    title: qrContents[id - 1].title,
    imgUrl: `/uploads/contents/${id}.jpg`,
  });
};

export const recommend = (req, res) => {
  const popup = encodeURIComponent(
    "현재 추천콘텐츠 서비스 개발 중입니다. \n조금만 기다려주세요."
  );
  return res.redirect("/contents/qna/1?popup=" + popup);
};
