const User = require("../models/user");

const findAllUsers = async () => {
    try {
        var users = await User.find({});
        return users;        
    }
    catch (err) {
        return false;
    }
}

const addUser = async (nickname) => {
    try {
        console.log(nickname);

        var user = new User({ nickname: nickname });
        await user.save();
        return user;
    } 
    catch (err) {
        console.log(err);
        if (err.message.split(' ')[0] ===  'E11000') {
            return 1;
        }
        return false;
    }
}
module.exports = {
    findAllUsers,
    addUser
};