const { Router } = require("express");
const stuff = Router();

const {
    postRegister,
    getStuff,
    getStuffById,
    updateStuff,
    deleteStuff,
    searchStuff,
    postLogin,
} = require("../controllers/stuff.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    registerValidationSchema,
    updateStuffValidationSchema,
    loginValidationSchema
} = require("../validation/stuffValidation");

/**
 * @swagger
 * tags:
 *   - name: Stuff
 *     description: Xodimlarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /stuff/register:
 *   post:
 *     summary: Yangi xodimni ro'yhatdan o'tkazish
 *     tags: [Stuff]
 *     description: Yangi xodimni yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Xodimning ismi
 *               lastName:
 *                 type: string
 *                 description: Xodimning familiyasi
 *               phoneNumber:
 *                 type: string
 *                 description: Xodimning telefon raqami
 *               login:
 *                 type: string
 *                 description: Xodimning login
 *               parol:
 *                 type: string
 *                 description: Xodimning paroli
 *     responses:
 *       "201":
 *         description: Xodim muvaffaqiyatli ro'yhatdan o'tdi
 *       "400":
 *         description: Yomon so'rov, validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */
stuff.post("/register", validateSchema(registerValidationSchema), postRegister);

/**
 * @swagger
 * /stuff/login:
 *   post:
 *     summary: Xodim tizimga kirishi
 *     tags: [Stuff]
 *     description: Xodimni kiritilgan ma'lumotlar bilan tizimga kiritish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: Xodimning login (login yoki phoneNumber kiritilishi kerak)
 *               phoneNumber:
 *                 type: string
 *                 description: Xodimning telefon raqami
 *               parol:
 *                 type: string
 *                 description: Xodimning paroli
 *     responses:
 *       "200":
 *         description: Tizimga muvaffaqiyatli kirildi va token qaytarildi
 *       "400":
 *         description: Yomon so'rov, validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */
stuff.post("/login", validateSchema(loginValidationSchema), postLogin);


/**
 * @swagger
 * /stuff/getStuff:
 *   get:
 *     summary: Barcha xodimlarni olish
 *     tags: [Stuff]
 *     description: Barcha xodimlarni olish
 *     responses:
 *       "201":
 *         description: Xodim muvaffaqiyatli ro'yhatdan o'tdi
 *       "400":
 *         description: Yomon so'rov, validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */
stuff.get("/getStuff", getStuff);


/**
 * @swagger
 * /stuff/getStuffById/{id}:
 *   get:
 *     summary: Barcha xodim ID orqali olish
 *     tags: [Stuff]
 *     description: ID orqali bitta xodimni olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Xodimning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Xodim ID orqali muvaffaqiyatli qaytarildi
 *       "400":
 *         description: Yomon so'rov, validatsiya xatosi
 *       "500": 
 *         description: Ichki server xatosi
 */
stuff.get("/getStuffById/:id", getStuffById);

/**
 * @swagger
 * /stuff/updateStuff/{id}:
 *   put:
 *     summary: Xodim ma'lumotlarini yangilash
 *     tags: [Stuff]
 *     description: ID orqali berilgan xodim ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan xodimning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Xodimning yangi ismi
 *               lastName:
 *                 type: string
 *                 description: Xodimning yangi familiyasi
 *               phoneNumber:
 *                 type: string
 *                 description: Xodimning yangi telefon raqami
 *               parol:
 *                 type: string
 *                 description: Xodimning yangi paroli
 *     responses:
 *       "200":
 *         description: Xodim ma'lumotlari muvaffaqiyatli yangilandi
 *       "400":
 *         description: Yomon so'rov, validatsiya xatosi
 *       "500": 
 *         description: Ichki server xatosi
 */
stuff.put("/updateStuff/:id", validateSchema(updateStuffValidationSchema), updateStuff);


/**
 * @swagger
 * /stuff/deleteStuff/{id}:
 *   delete:
 *     summary: Xodimni o'chirish
 *     tags: [Stuff]
 *     description: ID orqali berilgan xodimni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan xodimning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Xodim muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Xodim topilmadi
 *       "500": 
 *         description: Ichki server xatosi
 */
stuff.delete("/deleteStuff/:id", deleteStuff);

/**
 * @swagger
 * /stuff/searchStuff:
 *   get:
 *     summary: Xodimlarni qidirish
 *     tags: [Stuff]
 *     description: Matnga qarab xodimlarni qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Qidirish matni
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Qidirish natijalari muvaffaqiyatli qaytarildi
 *       "400":
 *         description: Yomon so'rov, validatsiya xatosi
 *       "500": 
 *         description: Ichki server xatosi
 */
stuff.get("/searchStuff", searchStuff);

module.exports = { stuff };
