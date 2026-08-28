const { Lid } = require("../model/lidSchema");

// ----------------Create Lid------------------------
const createLid = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            phone_number,
            lid_stage_id,
            test_date,
            trial_lesson_date,
            trial_lesson_time,
            trial_lesson_group_id,
            lid_status_id,
            cancel_reson_id,
        } = req.body;

        const newLid = new Lid({
            first_name,
            last_name,
            phone_number,
            lid_stage_id: lid_stage_id || undefined,
            test_date: test_date || undefined,
            trial_lesson_date: trial_lesson_date || undefined,
            trial_lesson_time,
            trial_lesson_group_id: trial_lesson_group_id || undefined,
            lid_status_id: lid_status_id || undefined,
            cancel_reson_id: cancel_reson_id || undefined,
        });

        await newLid.save();

        return res.status(201).json({
            success: true,
            message: "Lid muvaffaqiyatli yaratildi.",
            innerData: newLid,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Lid yaratishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get Lids------------------------
const getAllLids = async (req, res) => {
    try {
        const lids = await Lid.find({})
            .populate("lid_stage_id")
            .populate("trial_lesson_group_id")
            .populate("lid_status_id")
            .populate("cancel_reson_id");

        res.json({
            success: true,
            message: "Barcha lidlar ro'yxati olingan.",
            innerData: lids,
        });
    } catch (error) {
        console.error("Error fetching lids:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: L西部larni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get Lid By ID------------------------
const getLidById = async (req, res) => {
    try {
        const lidId = req.params.id;
        const lid = await Lid.findById(lidId)
            .populate("lid_stage_id")
            .populate("trial_lesson_group_id")
            .populate("lid_status_id")
            .populate("cancel_reson_id");

        if (!lid) {
            return res.status(404).json({ message: "Lid not found" });
        }

        return res.status(200).json({ message: "Lid found", innerData: lid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update Lid Teacher------------------------
const updateLid = async (req, res) => {
    try {
        const lidId = req.params.id;

        const updatedLid = await Lid.findByIdAndUpdate(
            lidId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedLid) {
            return res.status(404).json({
                success: false,
                message: "Lid topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Lid ma'lumotlari yangilandi",
            innerData: updatedLid,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete Lid------------------------
const deleteLid = async (req, res) => {
    try {
        const lidId = req.params.id;
        const deletedLid = await Lid.findByIdAndDelete(lidId);

        if (!deletedLid) {
            return res.status(404).json({ message: "Lid not found" });
        }

        res.json({ message: "Lid deleted successfully", innerData: deletedLid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search Lid-------------------
const searchLid = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await Lid.find({
            $or: [
                { first_name: { $regex: query, $options: "i" } },
                { last_name: { $regex: query, $options: "i" } },
                { phone_number: { $regex: query, $options: "i" } },
            ],
        })
            .populate("lid_stage_id")
            .populate("trial_lesson_group_id")
            .populate("lid_status_id")
            .populate("cancel_reson_id");

        if (result.length === 0) {
            return res.json({ message: "Bunday lid topilmadi" });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error fetching lids:", error);
        res.status(500).json({ message: "Server error: Failed to fetch lids." });
    }
};

module.exports = {
    createLid,
    getAllLids,
    getLidById,
    updateLid,
    deleteLid,
    searchLid,
};
