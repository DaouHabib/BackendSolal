const router = require('express-promise-router')();
const BoutiqueService = require('../services/boutique.service');



router.route('/')
    .get(BoutiqueService.getAll)
    .post(BoutiqueService.newBoutique)
    .delete(BoutiqueService.deleteAll)

router.route('/:boutiqueId')
    .get(BoutiqueService.getBoutique)
    .put(BoutiqueService.updateBoutique)
    .delete(BoutiqueService.deleteBoutique)

router.route('/Boutique')
    .post(BoutiqueService.AddBoutiqueToUser)

router.route('/getBoutique/:userId')
    .get(BoutiqueService.getBoutique)
    module.exports = router;