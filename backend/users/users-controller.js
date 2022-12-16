import axios from 'axios'
import * as userDao from './users-dao.js'

// Find all users
const findUsers = async (req, res) => {
    const users = await userDao.findAllUsers()
    res.json(users)
}

// Find user by id
const findUserById = async (req, res) => {
    const uid = req.params.uid;
    const user = await userDao.findUserById(uid)
    if (user) {
        res.json(user)
        return
    }
    res.sendStatus(404);
}

// Find users by name
const findUserByName = async (req, res) => {
    const name = req.params.name;
    const users = await userDao.findUsersByName(name)
    if (users) {
        res.send(users)
        return
    }
    res.sendStatus(404);
}

// Create user
const createUser = async (req, res) => {
    const newUser = req.body;
    const actualUser = await userDao.createUser(newUser) // with _id
    res.json(actualUser)
}

// Delete user
const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const user = await userDao.findUserById(uid)
    if (user) {
        res.json(user)
        await userDao.deleteUser(uid)
        return
    }
    res.sendStatus(404);
}

// Update user
const updateUser = async (req, res) => {
    const uid = req.params.uid;
    const updates = req.body;
    const user = await userDao.findUserById(uid)
    if (user) {
        await userDao.updateUser(uid, updates) 
        res.json(user)
        return
    }

    res.sendStatus(200);
}

// Update current user
const updateCurrentUser = async (req, res) => {
    const userId = req.session['currentUser']._id
    const updates = req.body;
    const user = await userDao.findUserById(userId)
    if (user) {
        await userDao.updateUser(userId, updates)
        req.session['currentUser'] = await userDao.findUserById(userId)
        res.json(user)
        return
    }

    res.sendStatus(200);
}

// Register user
const register = async (req, res) => {
    const user = req.body
    if (!user.email || !user.password) { // check if user provided email and password
        res.sendStatus(503)
        return
    }
    const existingUser = await userDao.findUserByEmail(user.email) // checj for existing user
    if (existingUser) {
        res.sendStatus(503)
        return
    }
    const newUser = await userDao.createUser(user)
    req.session['currentUser'] = newUser
    res.json(newUser)
}

const login = async (req, res) => {
    const credentials = req.body
    const existingUser = await userDao.findUserByCredentials(credentials.email, credentials.password)
    if (existingUser) {
        req.session['currentUser'] = existingUser
        res.json(existingUser)
        return
    }  
    else {
        res.sendStatus(503) // unauthorized
    }
}

const logout = async (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
}

const profile = async (req, res) => {
    if (req.session['currentUser']) {
        res.send(req.session['currentUser'])
    }
    else {
        res.sendStatus(503)
    }
}




// Routes
export default (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.get('/api/users/name/:name', findUserByName);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
    app.post('/register', register)
    app.post('/login', login)
    app.post('/logout', logout)
    app.post('/profile', profile)
    app.put('/update', updateCurrentUser)
}

