const router = require('express-promise-router')();
const ProduitService = require('../services/product.service');



router.route('/')
    .get(ProduitService.getAll)
    .post(ProduitService.newProduct)
    .delete(ProduitService.deleteAll)

router.route('/:productId')
    .get(ProduitService.getProduct)
    .put(ProduitService.updateProduct)
    .delete(ProduitService.deleteProduct)

    module.exports = router;