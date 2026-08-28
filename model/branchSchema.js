const { Schema, model } = require("mongoose");

const branchSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        call_number: {
            type: String,
            required: true,
            trim: true,
        },
    }
);

const Branch = model("Branch", branchSchema);

module.exports = { Branch };
