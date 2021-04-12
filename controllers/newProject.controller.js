const router = require('express-promise-router')();
const ProjectService = require('../services/newProject.service');



router.route('/')
    .get(ProjectService.getAll)
    .post(ProjectService.newProject)
    .delete(ProjectService.deleteAll)

router.route('/:projetId')
    .get(ProjectService.getProject)
    .put(ProjectService.updateProject)
    .delete(ProjectService.deleteProject)

    module.exports = router;