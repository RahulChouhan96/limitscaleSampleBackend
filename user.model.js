const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cal: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", UserSchema, "user");