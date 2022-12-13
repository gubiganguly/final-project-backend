import mongoose from 'mongoose'

const usersSchema = mongoose.Schema({
    isCompany: Boolean,
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
    connectionCount: Number,
    coins: Number,
    about: String,
    experience: Array,
    education: Array,
    skills: Array
}, {collection: 'users'})

export default usersSchema