var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var userSchema = require("./user.schema.server");

var userModel = mongoose.model("ProjectUserModel", userSchema);

userModel.createUser = createUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {
        $set: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            runescapeName: user.runescapeName
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}