const router = require('express-promise-router')();
const champService = require('../services/champ.service');



router.route('/')
    .get(champService.getAll)
    .post(champService.newchamp)
    .delete(champService.deleteAll)

router.route('/:champId')
    .get(champService.getchamp)
    .put(champService.updatechamp)
    .delete(champService.deletechamp)
    
module.exports = router;