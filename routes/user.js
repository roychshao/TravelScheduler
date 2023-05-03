import express from 'express';
import { register } from './../controller/user.js';
import { register_response } from './../middleware/user.js';

const router = express.Router();

router.post('/register', register, register_response);

export default router;
