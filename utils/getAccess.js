const UserInfo = require('../models/userInfo')
const catchAsync = require('./catchAsync')
const AppError = require('./appError')

exports.protected = catchAsync(async (req, res, next) => {
    let passwordSent
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') && req.headers.authorization.split(' ')[1]) {
        passwordSent = req.headers.authorization.split(' ')[1]
        const user = await UserInfo.findOne()
        if (!user) {
            return next()
        }

        if (await user.correctPassword(passwordSent, user.password)) {
            return next()
        } else {
            return next(new AppError("The password is wrong, you are not authorized", 403))
        }
    }
    if (!passwordSent) {
        return next(new AppError('You don\'t have access to this route', 401))
    }

})