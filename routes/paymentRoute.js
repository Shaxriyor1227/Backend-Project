const { Router } = require("express");
const payment = Router();

const {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
} = require("../controllers/payment.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createPaymentValidationSchema,
    updatePaymentValidationSchema,
} = require("../validation/paymentValidation");

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: O'quvchilar to'lovlarini boshqarish API endpointlari
 */

/**
 * @swagger
 * /payment/create:
 *   post:
 *     summary: Yangi to'lov yaratish
 *     tags: [Payment]
 *     description: O'quvchi uchun to'lov ma'lumotlarini kiritish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - price
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: O'quvchining ID si (MongoDB ObjectId)
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *                 description: Oxirgi to'lov muddati
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 description: To'lov amalga oshirilgan sana
 *               price:
 *                 type: number
 *                 description: To'lov summasi
 *               is_paid:
 *                 type: boolean
 *                 description: To'langanlik holati
 *               total_attent:
 *                 type: integer
 *                 description: Umumiy davomat soni
 *     responses:
 *       "201":
 *         description: To'lov muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */
payment.post("/create", validateSchema(createPaymentValidationSchema), createPayment);

/**
 * @swagger
 * /payment/getAll:
 *   get:
 *     summary: Barcha to'lovlarni olish
 *     tags: [Payment]
 *     description: Barcha to'lovlar ro'yxatini qaytaradi
 *     responses:
 *       "200":
 *         description: To'lovlar ro'yxati olindi
 *       "500":
 *         description: Ichki server xatosi
 */
payment.get("/getAll", getAllPayments);

/**
 * @swagger
 * /payment/getById/{id}:
 *   get:
 *     summary: ID orqali bitta to'lovni olish
 *     tags: [Payment]
 *     description: Berilgan ID ga mos to'lov ma'lumotlarini qaytaradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: To'lovning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: To'lov topildi
 *       "404":
 *         description: To'lov topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
payment.get("/getById/:id", getPaymentById);

/**
 * @swagger
 * /payment/update/{id}:
 *   put:
 *     summary: To'lov ma'lumotlarini yangilash
 *     tags: [Payment]
 *     description: ID orqali to'lov ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan to'lovning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *               payment_date:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *               is_paid:
 *                 type: boolean
 *               total_attent:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: To'lov muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi
 *       "404":
 *         description: To'lov topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
payment.put("/update/:id", validateSchema(updatePaymentValidationSchema), updatePayment);

/**
 * @swagger
 * /payment/delete/{id}:
 *   delete:
 *     summary: To'lovni o'chirish
 *     tags: [Payment]
 *     description: ID orqali to'lovni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan to'lovning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: To'lov muvaffaqiyatli o'chirildi
 *       "404":
 *         description: To'lov topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
payment.delete("/delete/:id", deletePayment);

module.exports = { payment };
