const { Marker } = require('../models/marker');
const { Action } = require('../models/actions');
const { Project } = require('../models/newProject');

const jwt = require('jsonwebtoken');

module.exports = {

    getAll: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
       const  Markers = await Marker.find({});
        res.status(200).json(Markers);}
        catch (ex) {
            res.status(400).send('invalid token.')
        }
    },
    newMarker: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
        Markers = new Marker(req.body);  
        await Markers.save();
        res.status(201).json((Markers));}
        catch (ex) {
            res.status(400).send('invalid token.')
        }
    },
   
    getMarker: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
        res.status(200).json(await Marker.findById(req.params.markerId).populate('actions'));}
        catch (ex) {
            res.status(400).send('invalid token.')
        }
},

    // PATCH || PUT
    updateMarker: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;
            const newProjet = req.body

            const projet = await Marker.findByIdAndUpdate(req.params.markerId , newProjet);

            res.status(200).json(newProjet);
            next();
        }
        catch (ex) {
            res.status(400).send('invalid token.')
        }

    },

    deleteMarker: async (req, res, next) => {
     
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;

            const Marker = await Marker.deleteMany();
            res.status(200).json('success');
            next();
        }
        catch (ex) {
            res.status(400).send('invalid token.')
        }
    },
    deleteAll: async (req, res, next) => {
       const  Markers = await Marker.deleteMany();
        res.status(200).json('success');
    },
       
    AddactionsToMarker: async (req, res, next) => {
        const marker = await Marker.findById(req.params.markerId);
        const action =req.body.filters;
        actions=[];
        console.log(action);
        action.forEach(element => {
           e=new Action(element);
            e.save();
            actions.push(e);

        });
        marker.actions=actions;
            marker.save();
        res.status(200).json(marker);
    },

    getMarkers: async (req, res, next) => {
        var result=[];
        projet = await Project.findById(req.params.projetId).populate('markers')
  
        res.status(200).json(projet.markers);

},

}
