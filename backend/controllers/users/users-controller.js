import people from './users.js'
let users = people

// Find all users
const findUsers = (req, res) => {
    const type = req.query.type
    if (type) {
        const usersOfType = users
            .filter(u => u.type === type)
        res.json(usersOfType)
        return
    }
    res.json(users)
}

// Find user by id
const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users
        .find(u => u._id.toString() === userId);
    res.json(user);
}

// Create user
const createUser = (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
}

// Delete user
const deleteUser = (req, res) => {
    const userId = req.params['uid'];
    users = users.filter(usr =>
        usr._id.toString() !== userId);
    res.sendStatus(200);
}

// Update user
const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    users = users.map((usr) =>
      usr._id.toString() === userId ?
        {...usr, ...updates} :
        usr
    );
    res.sendStatus(200);
   }
   

// Routes
export default (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

