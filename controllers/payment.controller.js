const { Payment } = require("../model/paymentSchema");
const { Student } = require("../model/studentSchema");

// ----------------Create Payment------------------------
const createPayment = async (req, res) => {
    try {
        const {
            student_id,
            payment_last_date,
            payment_date,
            price,
            is_paid,
            total_attent,
        } = req.body;

        const newPayment = new Payment({
            student_id,
            payment_last_date: payment_last_date || undefined,
            payment_date: payment_date || undefined,
            price,
            is_paid,
            total_attent,
        });

        await newPayment.save();

        return res.status(201).json({
            success: true,
            message: "To'lov muvaffaqiyatli yaratildi.",
            innerData: newPayment,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: To'lov yaratishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get Payments------------------------
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find({}).populate("student_id");
        res.json({
            success: true,
            message: "Barcha to'lovlar ro'yxati olingan.",
            innerData: payments,
        });
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: To'lovlarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get Payment By ID------------------------
const getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payment.findById(paymentId).populate("student_id");

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        return res.status(200).json({ message: "Payment found", innerData: payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update Payment Teacher------------------------
const updatePayment = async (req, res) => {
    try {
        const paymentId = req.params.id;

        const updatedPayment = await Payment.findByIdAndUpdate(
            paymentId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({
                success: false,
                message: "To'lov topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "To'lov ma'lumotlari yangilandi",
            innerData: updatedPayment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete Payment------------------------
const deletePayment = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const deletedPayment = await Payment.findByIdAndDelete(paymentId);

        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json({ message: "Payment deleted successfully", innerData: deletedPayment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search Payment-------------------
const searchPayment = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const matchingStudents = await Student.find({
            $or: [
                { first_name: { $regex: query, $options: "i" } },
                { last_name: { $regex: query, $options: "i" } },
                { phone_number: { $regex: query, $options: "i" } },
            ],
        }).select("_id");

        const studentIds = matchingStudents.map((s) => s._id);

        const conditions = [{ student_id: { $in: studentIds } }];

        if (!isNaN(query)) {
            conditions.push({ price: Number(query) });
        }

        const result = await Payment.find({
            $or: conditions,
        }).populate("student_id");

        if (result.length === 0) {
            return res.json({ message: "Bunday to'lov topilmadi", innerData: [] });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error searching payments:", error);
        res.status(500).json({ message: "Server error: Failed to fetch payments." });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
    searchPayment,
};
