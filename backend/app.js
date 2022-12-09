import express from 'express';
import UserController from './controllers/users/users-controller.js';
import PostsController from './controllers/posts/posts-controller.js'
import cors from 'cors'

const app = express()

// Middleware
app.use(express.json());
app.use(cors())

UserController(app)
PostsController(app)

app.listen(4000)