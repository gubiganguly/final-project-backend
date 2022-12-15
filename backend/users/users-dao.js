import usersModel from "./users-model.js";

export const createUser = (user) =>
    usersModel.create(user)

export const findUserByEmail = async (email) =>
    await usersModel.findOne({ email })

export const findUserByCredentials = async (email, password) =>
    await usersModel.findOne({ email, password })

export const findUsersByName = async (name) =>
    await usersModel.find({firstName: name})

export const findAllUsers = async () =>
    await usersModel.find()

export const deleteUser = async (uid) =>
    await usersModel.deleteOne({ _id: uid })

export const updateUser = async (uid, userUpdates) =>
    await usersModel.updateOne({ _id: uid },
        { $set: userUpdates })

export const findUserById = (uid) =>
    usersModel.findById(uid, { password: false }) 