import express from 'express';
import { Policy1 } from '../data/policy1';

export const getPolicy = (req, res) => {
  const POLICY = Policy1.contents.split('\n');

  return res.render('policy/policy', {
    pageTitle: '이용약관',
    contents: POLICY,
  });
};

export const postPolicy = (req, res) => {
  return res.redirect('/join');
};
