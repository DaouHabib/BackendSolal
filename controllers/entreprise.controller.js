const router = require('express-promise-router')();
const EntrepriseService = require('../services/entreprise.service');



router.route('/')
    .get(EntrepriseService.getAll)
    .post(EntrepriseService.newEntreprise)
    .delete(EntrepriseService.deleteAll)

router.route('/:entrepriseId')
    .get(EntrepriseService.getEntreprise)
    .put(EntrepriseService.updateEntreprise)
    .delete(EntrepriseService.deleteEntreprise)

router.route('/entreprise')
    .post(EntrepriseService.AddEntrepriseToUser)

router.route('/getEntreprise/:userId')
    .get(EntrepriseService.getallEntrepriseByUser)
    module.exports = router;