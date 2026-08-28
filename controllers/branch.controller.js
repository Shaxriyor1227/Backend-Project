const { Branch } = require("../model/branchSchema");

// ----------------Create Branch------------------------
const createBranch = async (req, res) => {
    try {
        const { name, address, call_number } = req.body;

        const existingBranch = await Branch.findOne({ name });
        if (existingBranch) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yhatdan o'tgan filial mavjud.",
            });
        }

        const newBranch = new Branch({
            name,
            address,
            call_number,
        });

        await newBranch.save();

        return res.status(201).json({
            success: true,
            message: "Filial muvaffaqiyatli yaratildi.",
            innerData: newBranch,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Filial yaratishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get Branches------------------------
const getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.find({});
        res.json({
            success: true,
            message: "Barcha filiallar ro'yxati olingan.",
            innerData: branches,
        });
    } catch (error) {
        console.error("Error fetching branches:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Filiallarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get Branch By ID------------------------
const getBranchById = async (req, res) => {
    try {
        const branchId = req.params.id;
        const branch = await Branch.findById(branchId);

        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        return res.status(200).json({ message: "Branch found", innerData: branch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update Branch Teacher------------------------
const updateBranch = async (req, res) => {
    try {
        const branchId = req.params.id;

        const updatedBranch = await Branch.findByIdAndUpdate(
            branchId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBranch) {
            return res.status(404).json({
                success: false,
                message: "Filial topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filial ma'lumotlari yangilandi",
            innerData: updatedBranch,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete Branch------------------------
const deleteBranch = async (req, res) => {
    try {
        const branchId = req.params.id;
        const deletedBranch = await Branch.findByIdAndDelete(branchId);

        if (!deletedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        res.json({ message: "Branch deleted successfully", innerData: deletedBranch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search Branch-------------------
const searchBranch = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await Branch.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { address: { $regex: query, $options: "i" } },
                { call_number: { $regex: query, $options: "i" } },
            ],
        });

        if (result.length === 0) {
            return res.json({ message: "Bunday filial topilmadi" });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error fetching branches:", error);
        res.status(500).json({ message: "Server error: Failed to fetch branches." });
    }
};

module.exports = {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
    searchBranch,
};
