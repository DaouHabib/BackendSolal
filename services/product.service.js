const { Product } = require('../models/product');
const jwt = require('jsonwebtoken');

module.exports = {

    getAll: async (req, res, next) => {
            const Produits = await Product.find({});
            res.status(200).json(Produits);
     
    },
    newProduct: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;
            Products = new Product(req.body);
            await Products.save();
            res.status(201).json((Products));
        }  catch (ex) {
            res.status(400).send('invalid token.')
        }
    },

    getProduct: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;
            const Products = await Product.findById(req.params.productId );
            res.status(200).json(Products);
            next();
        }
        catch (ex) {
            res.status(400).send('invalid token.')
        }

    },

    // PATCH || PUT
    updateProduct: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;
            const newProduct = req.body

            const Products = await Product.findByIdAndUpdate(req.params.productId , newProduct);

            res.status(200).json(newProduct);
            next();
        }
        catch (ex) {
            res.status(400).send('invalid token.')
        }

    },

    deleteProduct: async (req, res, next) => {

            const Products = await Product.findOneAndDelete(req.params.productId).exec(function (err, item) {
                if (err) {
                    return res.json({ success: false, msg: 'Cannot remove item' });
                }
                if (!item) {
                    return res.status(404).json({ success: false, msg: 'Product not found' });
                }
                res.json({ success: true, msg: 'Product deleted.' });
            });
      
    },
    deleteAll: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;

            const Products = await Product.deleteMany();
            res.status(200).json('success');
            next();
        }
        catch (ex) {
            res.status(400).send('invalid token.')
        }
    },
}
