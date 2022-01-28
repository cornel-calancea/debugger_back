const Lobby = require("../models/lobby");
const User = require("../models/user");

const findLobby = async (id) => {
    try {
        var lobby = await Lobby.findById(id)
            .populate("players")
            .populate("host");
            
        return lobby;        
    }
    catch (err) {
        return false;
    }
}

const getAllLobbies = async () => {
    try {
        var lobbies = await Lobby.find({private: false});
        return lobbies;        
    }
    catch (err) {
        return false;
    }
}

const addLobby = async (nickname) => {
    try {
        var user = await User.findOne({nickname: nickname});
        console.log(user);
        if (user == null) {
            return false;
        }
        var lobby = new Lobby({host: user._id, players: [user._id]});
        await lobby.save();
        
        return lobby;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const addPrivateLobby = async (nickname) => {
    try {
        var user = await User.findOne({nickname: nickname});
        console.log(user);
        if (user == null) {
            return false;
        }
        var lobby = new Lobby({host: user._id, players: [user._id], private: true});
        await lobby.save();
        
        return lobby;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateLobby = async (nickname, lobby_id) => {
    try {
        console.log(nickname);
        console.log(lobby_id);

        var user = await User.findOne({nickname: nickname});
        if (user == null) {
            return false;
        }

        console.log(user);
        var lobby = await Lobby.findById(lobby_id);

        if (lobby.players.includes(user._id)) {
            console.log("Deja e adaugat user-ul in lobby");
            return false;
        } 
        else {
            var res = await Lobby.updateOne({ _id: lobby_id }, { $push: { players: user._id } });
            console.log(res);
        }
        return res;

    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteUser = async (nickname, lobby_id) => {
    try {
        console.log(nickname);
        console.log(lobby_id);

        var user = await User.findOne({nickname: nickname});
        if (user == null) {
            return false;
        }

        console.log(user);
        var lobby = await Lobby.findById(lobby_id);

        if (!lobby.players.includes(user._id)) {
            console.log("USerul nu e adaugat");
            return false;
        } 
        else {
            var res = await Lobby.updateOne({ _id: lobby_id }, { $pull: { players: user._id } });
            console.log(res);
        }
        return res;

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    findLobby,
    addLobby,
    addPrivateLobby,
    updateLobby,
    getAllLobbies,
    deleteUser,
};