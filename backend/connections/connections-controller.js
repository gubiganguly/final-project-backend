import connectionList from "./connections.js"
import * as connectionsDao from './connections-dao.js'
let connections = connectionList

const createConnection = async (req, res) => {
    const uidA = req.params.uidA
    const uidB = req.params.uidB
    const newConnection = await connectionsDao.createConnection(uidA, uidB)
    res.json(newConnection)
}

const userUnfollowsUser = async (req, res) => {
    const uidA = req.params.uidA
    const uidB = req.params.uidB
    const status = await connectionsDao.userUnfollowsUser(uidA, uidB)
    res.send(status)
}

const findAllConnections = (req, res) => {
    const connections = connectionsDao.findAllConnections()
    res.json(connections)
}

const findAllConnectionsByUserId = (req, res) => {
    const uid = req.params.uid
}

const userFollows = (req, res) => {
    const user = req.params.uid
    let follows = []
    connections.map((c) => c.userA.toString() === user?
                    follows.push(Number(c.userB)) :
                    follows)

    res.send(follows)
}

const followsUser = (req, res) => {
    const user = req.params.uid
    let followers = []
    connections.map((c) => c.userB.toString() === user?
                    followers.push(Number(c.userA)) :
                    followers)
    res.send(followers)
}



// Routes
export default (app) => {
    app.post('/api/users/:uidA/follows/:uidB', createConnection);
    app.delete('/api/users/:uidA/unfollows/:uidB', userUnfollowsUser);
    app.get('/api/connections', findAllConnections);
    app.get('/api/connections/:uid', findAllConnectionsByUserId);
    app.get('/api/users/:uid/follows', userFollows);
    app.get('/api/users/:uid/followers', followsUser);
}