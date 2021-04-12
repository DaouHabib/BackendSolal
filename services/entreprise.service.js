const { Entreprise } = require('../models/entreprise');
const  {User}  = require('../models/user');

module.exports = {

    getAll: async (req, res, next) => {
        const Entreprises = await Entreprise.find({});
        res.status(200).json(Entreprises);
    },
    newEntreprise: async (req, res, next) => {
        Entreprises = new Entreprise(req.body);  
        await Entreprises.save();
        res.status(201).json((Entreprises));
    },
   
    getEntreprise: async (req, res, next) => {

        const Entreprises = await Entreprise.findById(req.params.entrepriseId);
        res.status(200).json(Entreprises);
},

    // PATCH || PUT
    updateEntreprise: async (req, res, next) => {
        const newEntreprise = req.body
      
            const Entreprises = await Entreprise.findByIdAndUpdate(req.params.entrepriseId, newEntreprise);
        
        res.status(200).json(Entreprises);
    },

    deleteEntreprise: async (req, res, next) => {
        const Entreprises = await Entreprise.findByIdAndRemove(req.params.entrepriseId).exec(function (err, item) {
            console.log(item);
            if (err) {
                return res.json({ success: false, msg: 'Cannot remove item' });
            }
            if (!item) {
                return res.status(404).json({ success: false, msg: 'Entreprise not found' });
            }
            res.json({ success: true, msg: 'Entreprise deleted.' });
        });
    },
    deleteAll: async (req, res, next) => {
        const Entreprises = await Entreprise.deleteMany();
        res.status(200).json('success');
    },
       
    AddEntrepriseToUser: async (req, res, next) => {
        const user = await User.findById(req.body.id);
        const sts = new Entreprise(req.body.entreprise);
        sts.save();
        user.entreprise.push(sts);
        user.save();
        res.status(200).json(user);
},
getallEntrepriseByUser: async (req, res, next) => {
    const user = await User.findById(req.params.userId).populate("entreprise")
    res.status(200).json(user);
},

}
