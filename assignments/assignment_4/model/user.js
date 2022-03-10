const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String, unique:true,required:true},
    isPromoted: {type:Boolean, default:null}
});

//creating a collection usinf the schema
const user = mongoose.model('user', userSchema);

module.exports = user;