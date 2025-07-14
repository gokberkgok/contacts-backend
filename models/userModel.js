const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please add the user name"],
    },
}, {
    timestamps : true,
});

module.exports = mongoose.model("User", userSchema);