const { Schema, model } = require("mongoose");

const stageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    }
);

const Stage = model("Stage", stageSchema);

module.exports = { Stage };
