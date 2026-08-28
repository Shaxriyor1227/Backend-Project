const { LidStatus } = require("../model/lidStatusSchema");

// ----------------Create LidStatus------------------------
const createLidStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const existingStatus = await LidStatus.findOne({ status });
        if (existingStatus) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yhatdan o'tgan status mavjud.",
            });
        }

        const newLidStatus = new LidStatus({ status });
        await newLidStatus.save();

        return res.status(201).json({
            success: true,
            message: "Lid statusi muvaffaqiyatli yaratildi.",
            innerData: newLidStatus,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Status yaratishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get LidStatuses------------------------
const getAllLidStatuses = async (req, res) => {
    try {
        const statuses = await LidStatus.find({});
        res.json({
            success: true,
            message: "Barcha statuslar ro'yxati olingan.",
            innerData: statuses,
        });
    } catch (error) {
        console.error("Error fetching statuses:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Statuslarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get LidStatus By ID------------------------
const getLidStatusById = async (req, res) => {
    try {
        const statusId = req.params.id;
        const lidStatus = await LidStatus.findById(statusId);

        if (!lidStatus) {
            return res.status(404).json({ message: "LidStatus not found" });
        }

        return res.status(200).json({ message: "LidStatus found", innerData: lidStatus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update LidStatus Teacher------------------------
const updateLidStatus = async (req, res) => {
    try {
        const statusId = req.params.id;

        const updatedStatus = await LidStatus.findByIdAndUpdate(
            statusId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({
                success: false,
                message: "Status topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Status ma'lumotlari yangilandi",
            innerData: updatedStatus,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete LidStatus------------------------
const deleteLidStatus = async (req, res) => {
    try {
        const statusId = req.params.id;
        const deletedStatus = await LidStatus.findByIdAndDelete(statusId);

        if (!deletedStatus) {
            return res.status(404).json({ message: "LidStatus not found" });
        }

        res.json({ message: "LidStatus deleted successfully", innerData: deletedStatus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search LidStatus-------------------
const searchLidStatus = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await LidStatus.find({
            $or: [
                { status: { $regex: query, $options: "i" } },
            ],
        });

        if (result.length === 0) {
            return res.json({ message: "Bunday status topilmadi" });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error fetching statuses:", error);
        res.status(500).json({ message: "Server error: Failed to fetch statuses." });
    }
};

module.exports = {
    createLidStatus,
    getAllLidStatuses,
    getLidStatusById,
    updateLidStatus,
    deleteLidStatus,
    searchLidStatus,
};
