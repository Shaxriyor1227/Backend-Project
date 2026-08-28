const { Schema, model } = require("mongoose");

const stuffRoleSchema = new Schema(
    {
        stuff_id: {
            type: Schema.Types.ObjectId,
            ref: "Stuff",
            required: true,
        },
        role_id: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
    }
);


const StuffRole = model("StuffRole", stuffRoleSchema);
module.exports = { StuffRole };
