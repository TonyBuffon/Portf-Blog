const express = require('express')

const postController = require('../controllers/postsController')
const getAccess = require('../utils/getAccess')

const router = express.Router()

router.route('/').get(postController.getAllPosts).post(getAccess.protected, postController.createPost)
router.route('/:id').get(postController.getPost).patch(getAccess.protected, postController.updatePost).delete(getAccess.protected, postController.deletePost)
router.get('/search/:query', postController.search)
module.exports = router