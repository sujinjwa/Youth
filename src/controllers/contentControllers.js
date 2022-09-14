import express from "express";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

export const about = (req, res) => {
  res.render("contents/about", { pageTitle: "About" });
};

export const youthkit = (req, res) => {
  res.render("contents/youthkit");
};

export const community = (req, res) => {
  res.render("contents/community", { pageTitle: "Community" });
};

export const qna = (req, res) => {
  // console.log(req.params);
  res.render("contents/qna", { pageTitle: "QnA" });
};

export const detail = (req, res) => {
  res.render("contents/detail", { pageTitle: "QR코드 렌더링" });
};

export const recommend = (req, res) => {
  res.render("contents/recommend");
};
