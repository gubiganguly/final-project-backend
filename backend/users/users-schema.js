import mongoose from 'mongoose'

const usersSchema = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    position: String,
    city: String,
    state: String,
    country: String,
    hasProfileImage: Boolean,
    image: String,
    connectionCount: {type: Number, default: 0},
    postCount: {type: Number, default: 0},
    jonCount: {type: Number, default: 0},
    about: String,
    experience: Array,
    education: Array,
    skills: Array,
    role: {type: String, enum: ['ADMIN', 'USER']}
}, {collection: 'users'})

export default usersSchema