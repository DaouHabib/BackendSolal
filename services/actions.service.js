const { Action } = require('../models/actions');
const jwt = require('jsonwebtoken');

module.exports = {

    getAll: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
       const  Actions = await Action.find({});
        res.status(200).json(Actions);}
        catch (ex) {
            res.status(400).send('invalid token.')
        }
    },
    newAction: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
        Actions = new Action(req.body);  
        await Actions.save();
        res.status(201).json((Actions));}
        catch (ex) {
            res.status(400).send('invalid token.')
        }
    },
   
    getAction: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
        res.status(200).json(await Action.findById(req.params.projetId));}
        catch (ex) {
            res.status(400).send('invalid token.')
        }
},

    // PATCH || PUT
    updateAction: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;
            const newProjet = req.body

            const projet = await Action.findByIdAndUpdate(req.params.projetId , newProjet);

            res.status(200).json(newProjet);
            next();
        }
        catch (ex) {
            res.status(400).send('invalid token.')
        }

    },

    deleteAction: async (req, res, next) => {
     
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;

            const Action = await Action.deleteMany();
            res.status(200).json('success');
            next();
        }
        catch (ex) {
            res.status(400).send('invalid token.')
        }
    },
    deleteAll: async (req, res, next) => {
       const  Actions = await Action.deleteMany();
        res.status(200).json('success');
    },
       



}
