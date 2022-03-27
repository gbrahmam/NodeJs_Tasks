const mongoose = require("mongoose")// importing mongoose module
const { Schema } = mongoose;// importing the schema method from the module

// cretaing our own schema
const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String, unique:true,required:true},
    // Mstatus:{type:String,enum:["single", "couple"], default:"single"}
    password:{type:String}
},{timestamps:true});

//creating a collection using the schema
const user = mongoose.model('user', userSchema);

module.exports = user;