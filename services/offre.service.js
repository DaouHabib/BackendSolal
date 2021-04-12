const { Offre } = require('../models/offre');
const  {User}  = require('../models/user');

module.exports = {

    getAll: async (req, res, next) => {
       const  offres = await Offre.find({});
        res.status(200).json(offres);
    },
    newOffre: async (req, res, next) => {
        offre = new Offre(req.body);  
        await offre.save();
        res.status(201).json((offre));
    },
   
    getOffre: async (req, res, next) => {

        res.status(200).json(await Offre.findById(req.params.offreId));
},

    // PATCH || PUT
    updateOffre: async (req, res, next) => {
        const newOffre = req.body
        await Offre.findByIdAndUpdate(req.params.offreId, newOffre).then(result=>{
            

        })
        
        res.status(200).json(newOffre);
    },

    deleteOffre: async (req, res, next) => {
       const  offre = await Offre.findByIdAndRemove(req.params.offreId).exec(function (err, item) {
            if (err) {
                return res.json({ success: false, msg: 'Cannot remove item' });
            }
            if (!item) {
                return res.status(404).json({ success: false, msg: 'Offre not found' });
            }
            res.json({ success: true, msg: 'Offre deleted.' });
        });
    },
    deleteAll: async (req, res, next) => {
       const  offres = await Offre.deleteMany();
        res.status(200).json('success');
    },
       
    AddOffreToUser: async (req, res, next) => {
        const user = await User.findById(req.body.id);
        const sts = new Offre(req.body.Offre);
        sts.save();
        user.Offre.push(sts);
        user.save();
        res.status(200).json(user);
},


}
