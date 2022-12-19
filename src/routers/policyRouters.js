import express from 'express';
import { policy } from '../controllers/policyController';

const policyRouter = express.Router();

policyRouter.get('/', policy);

export default policyRouter;
