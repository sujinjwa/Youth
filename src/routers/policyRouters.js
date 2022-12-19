import express from 'express';
import { getPolicy, postPolicy } from '../controllers/policyController';

const policyRouter = express.Router();

policyRouter.route('/').get(getPolicy).post(postPolicy);

export default policyRouter;
