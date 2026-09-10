import express from "express";
import { login, signup } from "../controller/user.controller.js";
import { createContact } from "../controller/contact.controller.js";

const router = express.Router()

router.post("/signup",signup)
router.post("/login", login)
router.post("/createContact", createContact);



export default router;

