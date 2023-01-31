/**
 * This file will hold the schema for the User resource
 */

const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    /**
     * name, userId, password, email, createdAt , updatedAt
     * userType [ ADMIN | ENGINEER | CUSTOMER ] , 
     * userStatus [ Pending | Approved | Rejected ]
     */
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type : String,
        required : true
    },
    phoneNumber: {
        type : Number,
        required : true,
        maxlength : 10
    },
    gender: {
        type : String,
        required : true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    userType: {
        type: String,
        required: true,
        default: 'student',
        enum: ['student', 'admin']
    },
    token : {
        type : String
    }
});

module.exports = mongoose.model("Users", userSchema);