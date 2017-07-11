var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


// SCHEMA FOR USER MODEL
var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    }
});

// METHODS
// GENERATE HASH
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// CHECK IS PASSWORD IS VALID
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// CREATE MODEL FOR USERS AND EXPOSE IT TO OUR APP
module.exports = mongoose.model('User', userSchema);