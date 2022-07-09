const Post = require('../models/postsModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllPosts = catchAsync(async (req, res, next) => {
    const limited = req.query.limit * 1 || 4
    const numberOfPosts = await Post.count()
    const sentPosts = await Post.find().sort({ _id: -1 }).limit(limited)
    res.status(200).json({
        status: 'success',
        allPostsLength: numberOfPosts,
        results: sentPosts.length,
        posts: { sentPosts }
    })
})

exports.getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id)
    if (!post) {
        return next(new AppError("We can't find this post", 404))
    }
    res.status(200).json({
        status: 'Success',
        post
    })
})

exports.createPost = catchAsync(async (req, res, next) => {
    const post = await Post.create(req.body);
    res.status(201).json({
        status: 'success',
        post
    })
})

exports.updatePost = catchAsync(async (req, res, next) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!post) {
        return next(new AppError("We can't find this post", 404))
    }
    res.status(200).json({
        status: 'success',
        post
    })
})

exports.deletePost = catchAsync(async (req, res, next) => {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) {
        return next(new AppError("We can't find this post", 404))
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.search = catchAsync(async (req, res, next) => {
    const searchQuery = req.params.query
    const limited = req.query.limit * 1 || 4

    const posts = await Post.find({ $text: { $search: searchQuery } }).sort({ _id: -1 }).limit(limited)
    const numberOfPosts = await Post.count()

    res.status(200).json({
        status: "success",
        data: posts,
        allPostsLength: numberOfPosts
    })
})