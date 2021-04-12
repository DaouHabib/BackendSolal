const router = require('express-promise-router')();
const usersService = require('../services/user.service');
const { User } = require('../models/user');
const auth = require('../middleware/auth');

router.get('/me',auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})
router.route('/')
    .get(usersService.getAll)
    .post(usersService.newUser)
    .delete(usersService.deleteAll)

router.route('/:userId')
    .get(usersService.getUser)
    .put(usersService.updateUser)
    .delete(usersService.deleteUser)
router.route('/sendEmail')
    .post(usersService.sendemail)
router.route('/convert')
    .post(usersService.ConvertImage)
router.route('/entreprise/:entrepriseId')
    .get(usersService.getEmployeeByEntreprise)
    .post(usersService.addEmployeeToEntreprise)
module.exports = router;