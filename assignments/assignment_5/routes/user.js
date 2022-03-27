const express = require("express")
const router = express.Router()
const user = require("../model/users")
const bodyparser = require("body-parser");
const { body, validationResult } = require('express-validator');
router.use(bodyparser.json());

// get route--retrive data
router.get("/", async (req,res) => {
    const users = await user.find();
res.json({users})
})

//if entered route is wrong we shall show the below message
router.get("*", (req,res) => {
res.status(404).json({
    status:"failed",
    message:"wrong path"
})
})

//post rourte--create data
router.post("/",body('email').isEmail(), async (req,res) =>{
    try{
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }
    const users = await user.create(req.body)
    res.json({
        status:"succes",
        data: users
    })
    } catch(e){

console.log(e);
res.status(500).json({
    status:"failed",
    message:e.message
})
    }
})

//put-- update the data, this is used to update mutiple fields at a atime
router.put("/:id", async (req,res) =>{
    try{
    const users = await user.updateOne({_id:req.params.id},req.body)
    res.json({
        status:"succes",
        data: users
    })
    } catch(e){

console.log(e);
res.status(500).json({
    status:"failed",
    message:e.message
})
    }
})

//delete route
router.delete("/:id", async (req,res) =>{
    try{
    const users = await user.deleteOne({_id:req.params.id},req.body)
    res.json({
        status:"succes",
        data: users
    })
    } catch(e){

console.log(e);
res.status(500).json({
    status:"failed",
    message:e.message
})
    }
})

//patch route--this is used to update only one field at a time
router.patch("/:id", async (req,res) =>{
    try{
    const users = await user.updateOne({_id:req.params.id},req.body)
    res.json({
        status:"succes",
        data: users
    })
    } catch(e){

console.log(e);
res.status(500).json({
    status:"failed",
    message:e.message
})
    }
})

module.exports = router