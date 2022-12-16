import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose'
import UserController from './users/users-controller.js';
import PostsController from './posts/posts-controller.js'
import FollowsController from './follows/follows-controller.js'
import SessionController from './session-controller.js';
import cors from 'cors'

const app = express()
app.set('trus proxy', 1)

// Middleware
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(session({
    secret: 'webdev rocks', 
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}  // true if on external server like heroku
}))

// APIs
UserController(app)
PostsController(app)
FollowsController(app)
SessionController(app)

// Database (make private)
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    family: 4
}
mongoose.connect('mongodb+srv://gubiisepic:Ganapati01@cluster0.ixiwg2z.mongodb.net/?retryWrites=true&w=majority', options)

app.listen(4000)