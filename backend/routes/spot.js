import express from "express";
import { create } from "./../controller/spot.js";
import { create_response } from "./../middleware/spot.js";

const router = express.Router();

router.post("/create", create, create_response);

export default router;
