import mongoose from 'mongoose'

const connectionSchema = mongoose.Schema({
    userA: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    userB: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: 'connections'})

export default connectionSchema