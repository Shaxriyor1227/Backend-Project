const { GroupStuff } = require("../model/groupStuffSchema");
const { Stuff } = require("../model/StuffSchema");

// ----------------Create GroupStuff------------------------
const createGroupStuff = async (req, res) => {
    try {
        const { group_id, stuff_id } = req.body;

        const existingStuff = await Stuff.findById(stuff_id);
        if (!existingStuff) {
            return res.status(404).json({
                success: false,
                message: "Bunday xodim topilmadi.",
            });
        }

        const existingRelation = await GroupStuff.findOne({ group_id, stuff_id });
        if (existingRelation) {
            return res.status(400).json({
                success: false,
                message: "Ushbu xodim allaqachon mazkur guruhga biriktirilgan.",
            });
        }

        const newGroupStuff = new GroupStuff({ group_id, stuff_id });
        await newGroupStuff.save();

        return res.status(201).json({
            success: true,
            message: "Xodim guruhga muvaffaqiyatli biriktirildi.",
            innerData: newGroupStuff,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Guruhga xodim biriktirishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get GroupStuff------------------------
const getAllGroupStuff = async (req, res) => {
    try {
        const list = await GroupStuff.find({})
            .populate({ path: "stuff_id", select: "-parol" })
            .populate("group_id");
        res.json({
            success: true,
            message: "Barcha guruh-xodim bog'lanishlari ro'yxati olingan.",
            innerData: list,
        });
    } catch (error) {
        console.error("Error fetching group_stuff:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get GroupStuff By ID------------------------
const getGroupStuffById = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await GroupStuff.findById(id)
            .populate({ path: "stuff_id", select: "-parol" })
            .populate("group_id");

        if (!item) {
            return res.status(404).json({ message: "GroupStuff not found" });
        }

        return res.status(200).json({ message: "GroupStuff found", innerData: item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update GroupStuff Teacher------------------------
const updateGroupStuff = async (req, res) => {
    try {
        const id = req.params.id;

        const updatedItem = await GroupStuff.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Bog'lanish ma'lumoti topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bog'lanish ma'lumotlari yangilandi",
            innerData: updatedItem,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete GroupStuff------------------------
const deleteGroupStuff = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedItem = await GroupStuff.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "GroupStuff not found" });
        }

        res.json({ message: "GroupStuff deleted successfully", innerData: deletedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createGroupStuff,
    getAllGroupStuff,
    getGroupStuffById,
    updateGroupStuff,
    deleteGroupStuff,
};
