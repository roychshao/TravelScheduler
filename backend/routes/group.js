import express from 'express';
import { get, create } from './../controller/group.js';
import { get_response, create_response } from './../middleware/group.js';

const router = express.Router();

router.get('/', get, get_response);
router.post('/create', create, create_response);

export default router;
