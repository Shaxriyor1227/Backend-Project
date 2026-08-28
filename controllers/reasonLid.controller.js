const { ReasonLid } = require("../model/reasonLidSchema");

// ----------------Create ReasonLid------------------------
const createReasonLid = async (req, res) => {
    try {
        const { reason_lid } = req.body;

        const newReasonLid = new ReasonLid({
            reason_lid,
        });

        await newReasonLid.save();

        return res.status(201).json({
            success: true,
            message: "Lid bekor qilish sababi muvaffaqiyatli yaratildi.",
            innerData: newReasonLid,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Sabab yaratishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get ReasonLids------------------------
const getAllReasonLids = async (req, res) => {
    try {
        const reasons = await ReasonLid.find({});
        res.json({
            success: true,
            message: "Barcha sabablar ro'yxati olingan.",
            innerData: reasons,
        });
    } catch (error) {
        console.error("Error fetching reasons:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Sabablarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get ReasonLid By ID------------------------
const getReasonLidById = async (req, res) => {
    try {
        const reasonId = req.params.id;
        const reason = await ReasonLid.findById(reasonId);

        if (!reason) {
            return res.status(404).json({ message: "ReasonLid not found" });
        }

        return res.status(200).json({ message: "ReasonLid found", innerData: reason });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update ReasonLid Teacher------------------------
const updateReasonLid = async (req, res) => {
    try {
        const reasonId = req.params.id;

        const updatedReason = await ReasonLid.findByIdAndUpdate(
            reasonId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedReason) {
            return res.status(404).json({
                success: false,
                message: "Sabab topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sabab ma'lumotlari yangilandi",
            innerData: updatedReason,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete ReasonLid------------------------
const deleteReasonLid = async (req, res) => {
    try {
        const reasonId = req.params.id;
        const deletedReason = await ReasonLid.findByIdAndDelete(reasonId);

        if (!deletedReason) {
            return res.status(404).json({ message: "ReasonLid not found" });
        }

        res.json({ message: "ReasonLid deleted successfully", innerData: deletedReason });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search ReasonLid-------------------
const searchReasonLid = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await ReasonLid.find({
            $or: [
                { reason_lid: { $regex: query, $options: "i" } },
            ],
        });

        if (result.length === 0) {
            return res.json({ message: "Bunday sabab topilmadi" });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error fetching reasons:", error);
        res.status(500).json({ message: "Server error: Failed to fetch reasons." });
    }
};

module.exports = {
    createReasonLid,
    getAllReasonLids,
    getReasonLidById,
    updateReasonLid,
    deleteReasonLid,
    searchReasonLid,
};
