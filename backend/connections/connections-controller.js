import connectionList from "./connections.js"
let connections = connectionList

const createConnection = (req, res) => {
    const uidA = req.params.uidA
    const uidB = req.params.uidB
    const connection = {
        _id: (new Date()).getTime(),
        userA: uidA,
        userB: uidB
    }
    connections.push(connection)
    res.json(connection)
}

const userUnfollowsUser = (req, res) => {
    const uidA = req.params.uidA
    const uidB = req.params.uidB
    connections = connections.filter((c) => c.userA !== uidA && c.userB !== uidB)
    res.send(200)
}

const findAllConnections = (req, res) => {
    res.json(connections)
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
    app.get('/api/users/:uid/follows', userFollows);
    app.get('/api/users/:uid/followers', followsUser);
}