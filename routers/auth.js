import { login, register } from "../Controllers/auth.js"

import express from "express"
import { protect } from "../middlewares/auth.js";
import { getProfile } from "../Controllers/profile.js";
import { createUserSchema } from "../schemas/userSchema.js";
import { validate } from "../middlewares/validatezod.js";
import { upload } from "../middlewares/uploud.js";
const router = express.Router();



/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Saka Abdi
 *               email:
 *                 type: string
 *                 format: email
 *                 example: saka@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */


router.post('/register',  validate (createUserSchema),register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: saka@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */

router.post('/login',login)
router.get('/profile', protect,getProfile)

export default router