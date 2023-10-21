const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "please add the contact email"]
    },
    location: {
        type: String,
        required: [true, "Please add the contact location"]
    },
    phone: {
        type: String,
        required: [true, "Please add contact information"]
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Contact", contactSchema)