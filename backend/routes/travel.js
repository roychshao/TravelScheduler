import express from 'express';
import { create } from './../controller/travel.js';
import { create_response } from './../middleware/travel.js';

const router = express.Router();

router.post('/create', create, create_response);

export default router;
