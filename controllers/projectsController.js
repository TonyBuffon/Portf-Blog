const Project = require('../models/projectModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllProjects = catchAsync(async (req, res, next) => {
    const limited = req.query.limit * 1 || 4

    const sentProjects = await Project.find().sort({ _id: -1 }).limit(limited)
    const numberOfProjects = await Project.count()

    res.status(200).json({
        status: 'success',
        allProjectsLength: numberOfProjects,
        results: sentProjects.length,
        projects: { sentProjects }
    })
})

exports.getProject = catchAsync(async (req, res, next) => {
    const project = await Project.findById(req.params.id)
    if (!project) {
        return next(new AppError("We can't find this project", 404))
    }
    res.status(200).json({
        status: 'Success',
        project
    })
})

exports.createProject = catchAsync(async (req, res, next) => {
    const project = await Project.create(req.body);
    res.status(201).json({
        status: 'success',
        project
    })
})

exports.updateProject = catchAsync(async (req, res, next) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!project) {
        return next(new AppError("We can't find this project", 404))
    }
    res.status(200).json({
        status: 'success',
        project
    })
})

exports.deleteProject = catchAsync(async (req, res, next) => {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
        return next(new AppError("We can't find this project", 404))
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
})