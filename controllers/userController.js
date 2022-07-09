const UserInfo = require('../models/UserInfo')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.updateUser = catchAsync(async (req, res, next) => {
    let user = await UserInfo.findOne()
    for (let propertyName in req.body) {
        user[propertyName] = req.body[propertyName]
    }

    await user.save()

    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    })
})
exports.getUser = catchAsync(async (req, res, next) => {
    const user = await UserInfo.findOne({}).select('-password')

    res.status(200).json({
        status: 'success',
        user
    })
})