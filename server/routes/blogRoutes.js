import express from 'express';
import { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } from '../controllers/blogController.js';

const router = express.Router()

// Routes
// GET || all blogs
router.get('/all-blog', getAllBlogsController)

// POST || create blog
router.post('/create-blog', createBlogController)

// PUT || update blog
router.put('/update-blog/:id', updateBlogController)

// GET || single blog
router.get('/get-blog/:id', getBlogByIdController)

// DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController)

//GET || user blog
router.get('/user-blog/:id', userBlogController)

export default router; 