const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: [true, "Please type your username"]
        },
        email: {
            type: String,
            required: [true, "Please add a unique email address"],
            unique: [true, "Email address already registered"]
        },
        password: {
            type: String,
            required: [true, "Please add a strong password"]
        },
}, {
    timestamps: true
}
)

module.exports = mongoose.model("User", userSchema)