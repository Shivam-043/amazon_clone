const express = require('express');
const User = require('../models/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

//SIGN UP ROUTE

authRouter.post('/api/signup', async (req, res) =>{

    try {
        const {name , email } = req.body;
        let password = req.body.password;
        let salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({msg: "User with Same Email Already Exists!"});
        }

        let user = new User({
            email, password, name
        })

        user = await user.save();
        res.json(user)
    } catch (error) {
        res.status(500).json({error : error.message});
    }
    
})

// SIGNIN Route

authRouter.post("/api/signin", async (req, res) =>{

    try {
        const {email,password } = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({msg: "User with this email does'nt exists"});
        }

        var isMatch = await bcrypt.compare(password , user.password,);

        if(!isMatch){
            return res.status(400).json({msg: "Incorrect Password."});
        }

        const token = jwt.sign({id: user._id} , "passwordKey");

        res.json({token , ...user._doc});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
    
})



module.exports = authRouter;
