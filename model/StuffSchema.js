const { Schema, model } = require("mongoose");

const stuffSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    login: { type: String, required: true, unique: true, trim: true },
    parol: { type: String, required: true, minlength: 6 },
    isActive: { type: Boolean, default: true },
});

const Stuff = model("Stuff", stuffSchema);
module.exports = { Stuff };