const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    //here we want to track the particular post created by whom, below syntax helps us
    user: {type: Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;