const { Group } = require("../model/groupSchema");

// ----------------Create Group------------------------
const createGroup = async (req, res) => {
    try {
        const { group_name } = req.body;

        const existingGroup = await Group.findOne({ group_name });
        if (existingGroup) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yhatdan o'tgan guruh mavjud.",
            });
        }

        const newGroup = new Group(req.body);
        await newGroup.save();

        return res.status(201).json({
            success: true,
            message: "Guruh muvaffaqiyatli yaratildi.",
            innerData: newGroup,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Guruh yaratishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get Groups------------------------
const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find({}).populate("group_stage_id").populate("branch_id");
        res.json({
            success: true,
            message: "Barcha guruhlar ro'yxati olingan.",
            innerData: groups,
        });
    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Guruhlarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get Group By ID------------------------
const getGroupById = async (req, res) => {
    try {
        const groupId = req.params.id;
        const group = await Group.findById(groupId).populate("group_stage_id").populate("branch_id");

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        return res.status(200).json({ message: "Group found", innerData: group });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update Group Teacher------------------------
const updateGroup = async (req, res) => {
    try {
        const groupId = req.params.id;

        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({
                success: false,
                message: "Guruh topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Guruh ma'lumotlari yangilandi",
            innerData: updatedGroup,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete Group------------------------
const deleteGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const deletedGroup = await Group.findByIdAndDelete(groupId);

        if (!deletedGroup) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.json({ message: "Group deleted successfully", innerData: deletedGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search Group-------------------
const searchGroup = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await Group.find({
            $or: [
                { group_name: { $regex: query, $options: "i" } },
                { room_number: { $regex: query, $options: "i" } },
                { lesson_week_day: { $regex: query, $options: "i" } },
            ],
        }).populate("group_stage_id").populate("branch_id");

        if (result.length === 0) {
            return res.json({ message: "Bunday guruh topilmadi" });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).json({ message: "Server error: Failed to fetch groups." });
    }
};

module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
    searchGroup,
};
