const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: {
        type: String,
        unique: true,
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
});

var Users = mongoose.model("User", userSchema);

module.exports = Users;

