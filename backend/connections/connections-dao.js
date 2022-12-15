import connectionsModel from "./connections-model.js";

export const createConnection = async (uidA, uidB) => {
    return await connectionsModel.create({userA: uidA, userB: uidN})
}
export const userUnfollowsUser = async(uidA, uidB) => {
    return await connectionsModel.deleteOne({userA: uidA, userB: uidB})
}

export const findAllConnectionsByUserId = async(uid) => {
    return await connectionsModel
        .find({user: uid}, {user: false})
        .populate('movie', 'title')
        .exec()
}
export const findUsersThatLikeMovie = async(mid) => {
    return await connectionsModel.find({movie: mid}, {movie: false})
        .populate('user', 'username')
        .exec()
}
export const findAllConnections = async () =>
    await connectionsModel.find()