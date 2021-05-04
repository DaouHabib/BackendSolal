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

router.route('/user/:userId')
    .get(ProjectService.getProjectbyiduser)

router.route('/marker/:projectId')
    .get(ProjectService.getProjectMarkers)
    .post(ProjectService.AddmarkerToProject)
    
router.route('/clearmarker/:projectId')
    .get(ProjectService.clearMarker)  

    module.exports = router;