import express from "express";

export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const about = (req, res) => {
  return res.render("contents/about", { pageTitle: "About" });
};

export const youthkit = (req, res) => {
  return res.render("contents/youthkit");
};

export const community = (req, res) => {
  return res.render("contents/community", { pageTitle: "Community" });
};

export const qna = (req, res) => {
  // console.log(req.params);
  return res.render("contents/qna", { pageTitle: "QnA" });
};

export const detail = (req, res) => {
  return res.render("contents/detail", { pageTitle: "QR코드 렌더링" });
};

export const recommend = (req, res) => {
  return res.render("contents/recommend");
};
