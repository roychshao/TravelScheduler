import express from "express";
import { get, create, delete_, edit } from "./../controller/travel.js";
import {
  get_response,
  create_response,
  delete_response,
  edit_response,
} from "./../middleware/travel.js";

const router = express.Router();

router.get("/get", get, get_response);
router.post("/create", create, create_response);
router.delete("/delete", delete_, delete_response);
router.put("/edit", edit, edit_response);

export default router;
