const router = require('express-promise-router')();
const markerService = require('../services/marker.service');



router.route('/')
    .get(markerService.getAll)
    .post(markerService.newMarker)
    .delete(markerService.deleteAll)

router.route('/:markerId')
    .get(markerService.getMarker)
    .put(markerService.updateMarker)
    .delete(markerService.deleteMarker)

router.route('/action/:markerId')
    .post(markerService.AddactionsToMarker)

router.route('/projet/:projetId')
    .get(markerService.getMarkers)
    
module.exports = router;