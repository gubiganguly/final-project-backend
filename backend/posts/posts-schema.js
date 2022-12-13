import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    name: String,
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