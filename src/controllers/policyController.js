import express from 'express';

export const getPolicy = (req, res) => {
  return res.render('policy/policy');
};

export const postPolicy = (req, res) => {
  return res.redirect('/join');
};
