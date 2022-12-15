import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    position: String,
    caption: String,
    isImage: Boolean,
    image: String,
    liked: Boolean,
    likes: Number,
    comments: Number,
    reposts: Number,
}, {collection: 'posts'})

export default postSchema