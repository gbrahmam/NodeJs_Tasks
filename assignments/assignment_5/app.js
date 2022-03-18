// here we shall perform all the crud operation using rest api

const express = require("express")
const app=express()
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
const loginRoutes = require("./routes/login")
const postRoutes = require("./routes/posts")
var jwt = require('jsonwebtoken');
const SECRET = "RESTAPI";

mongoose.connect('mongodb://localhost:27017/restapi').then(() => console.log("Mongo connected")).catch((e) => console.log(e))

app.use('/api/v1/users', userRoutes);
app.use("/api/v1", loginRoutes);


// before actually creating the post we need to do uservalidation, for that purpose we creare a middleware as below
app.use("/api/v1/posts", (req, res, next) =>{
    var token = req.headers.authorization.split("test ")[1];
    if(!token){
        return res.status(401).json({
            status: "failed",
            message: "Token is missing"
        })
    }

    // verify the token
    // the decoded parameter contains the body of the jwt token
    jwt.verify(token, SECRET, async function(err, decoded) {
        if(err){
            return res.status(401).json({
                status:"failed",
                message: "Invalid token"
            })
        }
        // here we are taking the user_id from the decoded, remember data holds the user_id value(payload)
        req.user = decoded.data;
        next();
    });
});


app.use("/api/v1", postRoutes);

app.listen(5000,() => console.log("server is connected"))