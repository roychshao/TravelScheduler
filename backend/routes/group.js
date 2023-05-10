import express from 'express';
import { create } from './../controller/group.js';
import { create_response } from './../middleware/group.js';

const router = express.Router();

router.post('/create', create, create_response);

export default router;
