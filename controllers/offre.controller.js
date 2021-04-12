const router = require('express-promise-router')();
const OffreService = require('../services/offre.service');



router.route('/')
    .get(OffreService.getAll)
    .post(OffreService.newOffre)
    .delete(OffreService.deleteAll)

router.route('/:offreId')
    .get(OffreService.getOffre)
    .put(OffreService.updateOffre)
    .delete(OffreService.deleteOffre)

router.route('/offre')
    .post(OffreService.AddOffreToUser)
    
    module.exports = router;