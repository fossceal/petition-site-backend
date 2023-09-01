const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { convertUTCDateToLocalDate } = require("../utils/dateToIST");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

userSchema.pre("save", function (next) {
    var date = convertUTCDateToLocalDate(new Date());
    const currentDate = date;
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model("User", userSchema);