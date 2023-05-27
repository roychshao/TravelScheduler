import express from "express";
import { delete_response } from "../middleware/group.js";
import { create } from "./../controller/travel.js";
import { create_response } from "./../middleware/travel.js";

const router = express.Router();

router.post("/create", create, create_response);
router.delete("/delete", delete_, delete_response);

export default router;
