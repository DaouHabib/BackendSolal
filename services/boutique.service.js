const { Boutique } = require('../models/boutique');
const  {User}  = require('../models/user');

module.exports = {

    getAll: async (req, res, next) => {
        const Offres = await Boutique.find({});
        res.status(200).json(Offres);
    },
    newBoutique: async (req, res, next) => {
        boutique = new Boutique(req.body);  
        await boutique.save();
        res.status(201).json((boutique));
    },
   
    getBoutique: async (req, res, next) => {

        const boutique = await Boutique.findById(req.params.boutiqueId);
        res.status(200).json(boutique);
},

    // PATCH || PUT
    updateBoutique: async (req, res, next) => {
        const newBoutique = req.body
      
            const boutique = await Boutique.findByIdAndUpdate(req.params.boutiqueId, newBoutique);
        
        res.status(200).json(newBoutique);
    },

    deleteBoutique: async (req, res, next) => {
        const boutique = await Boutique.findByIdAndRemove(req.params.boutiqueId).exec(function (err, item) {
            if (err) {
                return res.json({ success: false, msg: 'Cannot remove item' });
            }
            if (!item) {
                return res.status(404).json({ success: false, msg: 'Boutique not found' });
            }
            res.json({ success: true, msg: 'Boutique deleted.' });
        });
    },
    deleteAll: async (req, res, next) => {
        const Offres = await Boutique.deleteMany();
        res.status(200).json('success');
    },
       
    AddBoutiqueToUser: async (req, res, next) => {
        const user = await User.findById(req.body.id);
        const sts = new Boutique(req.body.Boutique);
        sts.save();
        user.Boutique.push(sts);
        user.save();
        res.status(200).json(user);
},
getallBoutiqueByUser: async (req, res, next) => {
    const user = await User.findById(req.params.userId).populate("Boutique")
    res.status(200).json(user);
},

}
