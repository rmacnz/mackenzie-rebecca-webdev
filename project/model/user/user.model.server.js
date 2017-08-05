var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var projectUserSchema = require("./user.schema.server");

var projectUserModel = mongoose.model("ProjectUserModel", projectUserSchema);

projectUserModel.createUser = createUser;
projectUserModel.findAllUsers = findAllUsers;
projectUserModel.findUserById = findUserById;
projectUserModel.findUserByUsername = findUserByUsername;
projectUserModel.findUserByCredentials = findUserByCredentials;
projectUserModel.updateUser = updateUser;
projectUserModel.deleteUser = deleteUser;

module.exports = projectUserModel;

function createUser(user) {
    return projectUserModel.create(user);
}

function findAllUsers() {
    return projectUserModel.find();
}

function findUserById(userId) {
    return projectUserModel.findById(userId);
}

function findUserByUsername(username) {
    return projectUserModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return projectUserModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return projectUserModel.update({_id: userId}, {
        $set: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gold: user.gold,
            buys: user.buys,
            sells: user.sells,
            inventory: user.inventory
        }
    });
}

function deleteUser(userId) {
    return projectUserModel.remove({_id: userId});
}