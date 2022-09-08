import express from "express";

export const home = (req, res) => {
  res.render("home");
};

export const about = (req, res) => {
  res.render("contents/about");
};

export const youthkit = (req, res) => {
  res.render("contents/youthkit");
};

export const why = (req, res) => {
  res.render("contents/why");
};

export const qna = (req, res) => {
  console.log(req.params);
  res.render("contents/qna");
};

export const recommend = (req, res) => {
  res.render("contents/recommend");
};
