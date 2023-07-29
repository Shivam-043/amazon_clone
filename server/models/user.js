const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            messages: "Please Enter a valid Email Address"
        }
    },
    password:{
        required: true,
        type: String,
        validate: {
            validator: (value) => {
                const re = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";
                return value.match(re);
            },
            messages: "Please Enter a valid Password"
        }
    },
    address : {
        type: String,
        default: ""
    },
    type:{
        type: String,
        default: "user"
    },

})

const User = mongoose.model('User' , userSchema);

module.exports = User;