const { Stuff } = require("../model/StuffSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ----------------Register Stuff------------------------
const postRegister = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phoneNumber,
            login,
            parol,
        } = req.body;

        const existingStuff = await Stuff.findOne({
            $or: [{ login }, { phoneNumber }]
        });

        if (existingStuff) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yhatdan o'tgan xodim mavjud.",
            });
        } else {
            const hashedPassword = await bcrypt.hash(parol, 10);
            const newStuff = new Stuff({
                firstName,
                lastName,
                phoneNumber,
                login,
                parol: hashedPassword,
            });

            await newStuff.save();

            const stuffResponse = newStuff.toObject();
            delete stuffResponse.parol;

            return res.status(201).json({
                success: true,
                message: "Xodim muvaffaqiyatli ro'yhatdan o'tdi.",
                innerData: stuffResponse,
            });
        }
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Ro'yhatdan o'tishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get Stuff------------------------
const getStuff = async (req, res) => {
    try {
        const stuff = await Stuff.find({}).select("-parol");
        res.json({
            success: true,
            message: "Barcha xodimlar ro'yxati olingan.",
            innerData: stuff,
        });
    } catch (error) {
        console.error("Error fetching stuff:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Xodimlarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get Stuff By ID------------------------
const getStuffById = async (req, res) => {
    try {
        const stuffId = req.params.id;
        const stuff = await Stuff.findById(stuffId).select("-parol");

        if (!stuff) {
            return res.status(404).json({ message: "Stuff not found" });
        }

        return res.status(200).json({ message: "Stuff found", innerData: stuff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update Stuff Teacher------------------------
const updateStuff = async (req, res) => {
    try {
        const stuffId = req.params.id;

        const updateData = { ...req.body };
        if (updateData.parol) {
            updateData.parol = await bcrypt.hash(updateData.parol, 10);
        }

        const updatedStuff = await Stuff.findByIdAndUpdate(
            stuffId,
            updateData,
            { new: true, runValidators: true }
        ).select("-parol");

        if (!updatedStuff) {
            return res.status(404).json({
                success: false,
                message: "Xodim topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Xodim ma'lumotlari yangilandi",
            innerData: updatedStuff,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete Stuff------------------------
const deleteStuff = async (req, res) => {
    try {
        const stuffId = req.params.id;
        const deletedStuff = await Stuff.findByIdAndDelete(stuffId).select("-parol");

        if (!deletedStuff) {
            return res.status(404).json({ message: "Stuff not found" });
        }

        res.json({ message: "Stuff deleted successfully", innerData: deletedStuff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search Stuff-------------------
const searchStuff = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await Stuff.find({
            $or: [
                { firstName: { $regex: query, $options: "i" } },
                { lastName: { $regex: query, $options: "i" } },
                { phoneNumber: { $regex: query, $options: "i" } },
                { login: { $regex: query, $options: "i" } },
            ],
        }).select("-parol");

        if (result.length === 0) {
            return res.json({ message: "Bunday xodim topilmadi" });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error fetching stuff:", error);
        res.status(500).json({ message: "Server error: Failed to fetch stuff." });
    }
};

//-----------Login-------------
const postLogin = async (req, res) => {
    try {
        const { login, phoneNumber, parol } = req.body;

        const filter = login ? { login } : { phoneNumber };
        const user = await Stuff.findOne(filter);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Login is invalid!",
            });
        }

        const passwordMatch = await bcrypt.compare(parol, user.parol);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Login or password is invalid",
            });
        }

        const token = jwt.sign(
            { id: user._id, login: user.login },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1d" }
        );

        return res.json({
            message: "Token",
            token: token,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error: An error occurred during the login process.",
        });
    }
};

module.exports = {
    postRegister,
    getStuff,
    getStuffById,
    updateStuff,
    deleteStuff,
    searchStuff,
    postLogin,
};