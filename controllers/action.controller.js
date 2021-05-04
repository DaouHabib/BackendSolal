const router = require('express-promise-router')();
const actionService = require('../services/actions.service');

router.route('/')
    .get(actionService.getAll)
    .post(actionService.newAction)
    .delete(actionService.deleteAll)

router.route('/:actionId')
    .get(actionService.getAction)
    .put(actionService.updateAction)
    .delete(actionService.deleteAction)
    
module.exports = router;