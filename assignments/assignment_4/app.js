//have all the required modules imported 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./model/user");
const bodyparser = require("body-parser");
var methodOverride = require('method-override');


//MONGODB database connection
mongoose.connect('mongodb://localhost:27017/assignment_4')

//use the imported modules on the app
app.use(bodyparser());
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");


//HOMEPAGE
app.get("/", async (req,res) =>{
    //add the code to read data from the database, which we stored when user entered data into our input form
    const users = await user.find();
    // console.log(users)
    res.render("index.ejs",{users});
});

//form page route
app.get("/form", (req,res) => {
    res.render("form.ejs");
})

//posting the user entry data
app.post("/user/add", async (req,res) =>{
    // console.log(req.body)
    const {name, email} = req.body;
    await user.create({
        name,
        email
    });
    res.redirect("/")
});

//modifying the data
app.put("/user/:id/promote", async (req,res) =>{
    // await user.updateOne({_id:req.params.id}, {isPromoted:true});
    await user.updateOne({_id:req.params.id},[{ $set: { isPromoted: { $not: ["$isPromoted"] }} }]);
    res.redirect("/")
});

app.delete("/user/:id/delete", async (req,res) =>{
   await user.deleteOne({_id:req.params.id})
   res.redirect("/")
});

app.listen(3000, () => console.log("server started running on given port"));


