import express from 'express';

export const getPolicy = (req, res) => {
  return res.render('policy/policy', { pageTitle: '이용약관' });
};

export const postPolicy = (req, res) => {
  return res.redirect('/join');
};
