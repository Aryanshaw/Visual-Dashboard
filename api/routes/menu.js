import express from "express";
import { getAllMenuData } from "../controller/Menu.js";

const router = express.Router();
router.get("/dashboard-menu", getAllMenuData);

export default router;
