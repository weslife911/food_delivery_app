const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
}, { timestamps: true });

const User = model("User", userSchema);

module.exports = User;