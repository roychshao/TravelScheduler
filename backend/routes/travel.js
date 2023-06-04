import express from "express";
import { create, delete_ } from "./../controller/travel.js";
import { create_response, delete_response } from "./../middleware/travel.js";

const router = express.Router();

router.post("/create", create, create_response);
router.delete("/delete", delete_, delete_response);

export default router;
