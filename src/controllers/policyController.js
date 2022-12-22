import express from 'express';
import { Policy1, Policy2 } from '../data/policy';

export const getPolicy = (req, res) => {
  const POLICY1 = Policy1.contents.split('\n');
  const POLICY2 = Policy2.contents.split('\n');

  return res.render('policy/policy', {
    pageTitle: '이용약관',
    contents1: POLICY1,
    contents2: POLICY2,
  });
};

export const postPolicy = (req, res) => {
  return res.redirect('/join');
};
