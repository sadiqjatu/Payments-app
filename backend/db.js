const mongoose = require("mongoose");
const {Schema} = mongoose;

//Create a Schema for users
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",     //referencing the user model
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

//Create a model from the schema
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

//exporting the model
module.exports = { User, Account};