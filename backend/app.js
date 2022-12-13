import express from 'express';
import mongoose from 'mongoose'
import UserController from './users/users-controller.js';
import PostsController from './posts/posts-controller.js'
import ConnectionsController from './connections/connections-controller.js';
import cors from 'cors'

const app = express()


// Middleware
app.use(express.json());
app.use(cors())

// APIs
UserController(app)
PostsController(app)
ConnectionsController(app)

// Database (make private)
mongoose.connect('mongodb+srv://gubiisepic:Ganapati01@cluster0.ixiwg2z.mongodb.net/?retryWrites=true&w=majority')

app.listen(4000)