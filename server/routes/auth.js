const express = require('express');
const User = require('../models/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
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

authRouter.get('/tokenIsValid' , async(req, res) =>{

    try {
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);
        const verified = jwt.verify(token, "passwordKey");
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        return res.json(true);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})

authRouter.get('/' , auth , async (req, res) =>{
    const user= await User.findById(req.user);
    res.json({...user._doc, token: req.token});
})



module.exports = authRouter;
