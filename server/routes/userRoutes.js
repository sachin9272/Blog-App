import express from 'express';

import { getAllUsers, loginController, registerController } from "../controllers/userController.js";
const router = express.Router()

// Get All Users || GET
router.get('/all-users',getAllUsers)

//CReate User || POST
router.post('/register', registerController)

// Login || POST
router.post('/login',loginController)
export default router;