const { Champ } = require('../models/champ');

module.exports = {

    getAll: async (req, res, next) => {
        const champs = await Champ.find({});
        res.status(200).json(champs);
    },
    newchamp: async (req, res, next) => {
        champ = new Champ(req.body);  
        await champ.save();
        res.status(201).json((champ));
    },
   
    getchamp: async (req, res, next) => {

        const champ = await Champ.findById(req.params.champId);
        res.status(200).json(champ);
},

    // PATCH || PUT
    updatechamp: async (req, res, next) => {
        const newchamp = req.body
      
            const champ = await Champ.findByIdAndUpdate(req.params.champId, newchamp);
        
        res.status(200).json(newchamp);
    },

    deletechamp: async (req, res, next) => {
        const champ = await Champ.findByIdAndRemove(req.params.champId).exec(function (err, item) {
            if (err) {
                return res.json({ success: false, msg: 'Cannot remove item' });
            }
            if (!item) {
                return res.status(404).json({ success: false, msg: 'champ not found' });
            }
            res.json({ success: true, msg: 'champ deleted.' });
        });
    },
    deleteAll: async (req, res, next) => {
        const champs = await Champ.deleteMany();
        res.status(200).json('success');
    },

}
