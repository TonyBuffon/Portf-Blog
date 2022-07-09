const express = require('express')

const userController = require('../controllers/userController')
const getAccess = require('../utils/getAccess')
const router = express.Router()

router.route('/').get(userController.getUser)
router.route('/').patch(getAccess.protected, userController.updateUser)

module.exports = router