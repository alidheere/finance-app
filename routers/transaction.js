import express from 'express';
import { createTransaction, deleteTransaction, getTransaction, monthlySummary, updateTransaction } from '../Controllers/transaction.js';
import { protect } from '../middlewares/auth.js';
const router= express.Router();
/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management
 */
/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Salary
 *               amount:
 *                 type: number
 *                 example: 1000
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *                 example: income
 *               category:
 *                 type: string
 *                 example: salary
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-09-17
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect, createTransaction)
/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get my transactions
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user transactions
 *       401:
 *         description: Unauthorized
 */
router.get('/',protect, getTransaction)
/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     summary: Get transaction monthly summary
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction summary
 *       401:
 *         description: Unauthorized
 */
router.get('/monthly-Summary', protect, monthlySummary)

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68cabc123456789012345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Salary
 *               amount:
 *                 type: number
 *                 example: 1200
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *                 example: income
 *               category:
 *                 type: string
 *                 example: salary
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-09-17
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', protect, updateTransaction)
/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68cabc123456789012345678
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', protect, deleteTransaction)
export default router