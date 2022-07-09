const express = require('express')

const projectController = require('../controllers/projectsController')
const getAccess = require('../utils/getAccess')

const router = express.Router()

router.route('/').get(projectController.getAllProjects).post(getAccess.protected, projectController.createProject)
router.route('/:id').get(projectController.getProject).patch(getAccess.protected, projectController.updateProject).delete(getAccess.protected, projectController.deleteProject)

module.exports = router