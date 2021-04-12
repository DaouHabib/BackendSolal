const { Project } = require('../models/newProject');
const jwt = require('jsonwebtoken');

module.exports = {

    getAll: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
       const  Projects = await Project.find({});
        res.status(200).json(Projects);}
        catch (ex) {
            res.status(400).send('invalid token.')
        }
    },
    newProject: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
        Projects = new Project(req.body);  
        await Projects.save();
        res.status(201).json((Projects));}
        catch (ex) {
            res.status(400).send('invalid token.')
        }
    },
   
    getProject: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
        res.status(200).json(await Project.findById(req.params.projetId));}
        catch (ex) {
            res.status(400).send('invalid token.')
        }
},

    // PATCH || PUT
    updateProject: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;
            const newProjet = req.body

            const projet = await Project.findByIdAndUpdate(req.params.projetId , newProjet);

            res.status(200).json(newProjet);
            next();
        }
        catch (ex) {
            res.status(400).send('invalid token.')
        }

    },

    deleteProject: async (req, res, next) => {
     
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;

            const project = await Project.deleteMany();
            res.status(200).json('success');
            next();
        }
        catch (ex) {
            res.status(400).send('invalid token.')
        }
    },
    deleteAll: async (req, res, next) => {
       const  Projects = await Project.deleteMany();
        res.status(200).json('success');
    },
       



}
