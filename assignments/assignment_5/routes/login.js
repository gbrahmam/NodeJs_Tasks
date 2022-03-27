const express = require("express")
const router = express.Router()
const user = require("../model/users")
const { body, validationResult } = require('express-validator');// using express validator
const bodyparser = require("body-parser");//for converting response to readable format
const bcrypt = require("bcrypt");// for encryption
var jwt = require('jsonwebtoken');// for assigning tokens and expiry time
const SECRET = "RESTAPI";// ideally SECRET are declared as environment variables
router.use(bodyparser.json());


//register route
router.post('/register', body("name"),body("email"),body("password"), async(req,res) => {

    const error = validationResult(req);
    try{

    if (!error.isEmpty()){
        return res.status(400).json({
            status:"incorrect",
            error:error.array()
        });
    }

    const {name,email,password} = req.body;
    bcrypt.hash(password,10, async (err,hash) => {
        if (err){
            return res.status(400).json({
                status:"failed",
                message:"invalid details"
            })
        }

        const users = await user.create({
            name,
            email,
            password:hash
        })
        // console.log(req.body)
        res.json({
            status:"success",
            data:users
        })
    })
} catch(e){
    console.log(e);
res.status(500).json({
    status:"failed",
    message:e.message
})
}
})

router.post("/login", body("email"), body("password"), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email, password} = req.body;
        // check if user is there
        const users = await user.findOne({email});
        if(!users){
            res.status(401).json({
                status:"failed",
                message:"Invalid user"
            })
        }
        // Load hash from your password DB. here passwprd is what we gave and user.password is the hash value
        bcrypt.compare(password, users.password).then(function(result) {
            if(result){
                // while creating a token we are actually assigning a SECRET to it
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: users._id
                  }, SECRET);
                res.json({
                    status: "sucess",
                    token
                })
            }else{
                res.status(401).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
        });
       
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})
module.exports = router