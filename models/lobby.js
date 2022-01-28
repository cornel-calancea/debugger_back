const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lobbySchema = new Schema({
    host: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    duration: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "New"
    },
    private: {
        type: Boolean,
        default: false
    }
});

var Lobbies = mongoose.model("Lobby", lobbySchema);

module.exports = Lobbies;