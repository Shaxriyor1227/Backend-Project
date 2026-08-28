const { Stage } = require("../model/stageSchema");

// ----------------Create Stage------------------------
const createStage = async (req, res) => {
    try {
        const { name } = req.body;

        const existingStage = await Stage.findOne({ name });
        if (existingStage) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yhatdan o'tgan bosqich mavjud.",
            });
        }

        const newStage = new Stage({
            name,
        });

        await newStage.save();

        return res.status(201).json({
            success: true,
            message: "Bosqich muvaffaqiyatli yaratildi.",
            innerData: newStage,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Bosqich yaratishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get Stages------------------------
const getAllStages = async (req, res) => {
    try {
        const stages = await Stage.find({});
        res.json({
            success: true,
            message: "Barcha bosqichlar ro'yxati olingan.",
            innerData: stages,
        });
    } catch (error) {
        console.error("Error fetching stages:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Bosqichlarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get Stage By ID------------------------
const getStageById = async (req, res) => {
    try {
        const stageId = req.params.id;
        const stage = await Stage.findById(stageId);

        if (!stage) {
            return res.status(404).json({ message: "Stage not found" });
        }

        return res.status(200).json({ message: "Stage found", innerData: stage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update Stage Teacher------------------------
const updateStage = async (req, res) => {
    try {
        const stageId = req.params.id;

        const updatedStage = await Stage.findByIdAndUpdate(
            stageId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStage) {
            return res.status(404).json({
                success: false,
                message: "Bosqich topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bosqich ma'lumotlari yangilandi",
            innerData: updatedStage,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete Stage------------------------
const deleteStage = async (req, res) => {
    try {
        const stageId = req.params.id;
        const deletedStage = await Stage.findByIdAndDelete(stageId);

        if (!deletedStage) {
            return res.status(404).json({ message: "Stage not found" });
        }

        res.json({ message: "Stage deleted successfully", innerData: deletedStage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search Stage-------------------
const searchStage = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await Stage.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
            ],
        });

        if (result.length === 0) {
            return res.json({ message: "Bunday bosqich topilmadi" });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error fetching stages:", error);
        res.status(500).json({ message: "Server error: Failed to fetch stages." });
    }
};

module.exports = {
    createStage,
    getAllStages,
    getStageById,
    updateStage,
    deleteStage,
    searchStage,
};
