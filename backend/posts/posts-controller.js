import postList from './posts.js'
import * as postsDao from './posts-dao.js'
let posts = postList;


// Find all posts
const findPosts = async (req, res) => {
    const posts = await postsDao.findPosts()
    res.json(posts);
}

// Create a post
const createPost = async (req, res) => {
    const newPost = req.body;
    newPost.isImage = false,
    newPost.likes = 0;
    newPost.liked = false;
    newPost.reposts = 0;
    const insertedPost = await postsDao.createPost(newPost)
    res.json(insertedPost);
}

// Update post
const updatePost = (req, res) => {
    const postIdToUpdate = req.params.pid;
    const updates = req.body;
    const postIndex = posts.findIndex((p) => p._id.toString() === postIdToUpdate)
    posts[postIndex] = { ...posts[postIndex], ...updates };
    res.sendStatus(200);
}

// Delete a post by id
const deletePost = (req, res) => {
    const postIdToDelete = req.params['pid'];
    posts = posts.filter(p => p._id.toString() !== postIdToDelete);
    res.sendStatus(200);
}

// Routes
export default (app) => {
    app.get('/api/posts', findPosts);
    app.post('/api/posts', createPost);
    app.put('/api/posts/:pid', updatePost);
    app.delete('/api/posts/:pid', deletePost);
}
