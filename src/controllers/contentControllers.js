import express from 'express';
import { qrContents } from './qrContents';

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
