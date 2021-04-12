const { User } = require('../models/user');
const { hashedPwd } = require('../helpers/utility');
const bcrypt = require('bcryptjs');
const {Entreprise} = require('../models/entreprise');
const { JWT_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var Jimp = require('jimp');

module.exports = {

    getAll: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;
        const users = await User.find({});
        res.status(200).json(users);
        next();
    }
    catch (ex) {
        res.status(400).send('invalid token.')
    }
    },
    newUser: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;


        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('user already registred');

        user = new User(req.body);
        user.creation_dt = Date.now();
        user.password = await hashedPwd(req.body.password);
        user.imageUrl = req.body.imageUrl;
        await user.save();

        res.status(201).json((user));
        
     next();
    }
    catch (ex) {
        res.status(400).send('invalid token.')
    }
    },
   
    getUser: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;

        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
     next();
    }
    catch (ex) {
        res.status(400).send('invalid token.')
    }
},

    // PATCH || PUT
    updateUser: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;
        const newUSer = req.body
            const userCheck = await User.findById(req.params.userId);
            console.log(userCheck.password),
            console.log(newUSer.password);
            if(newUSer.password){
            const validpwd = (newUSer.password== userCheck.password);
            console.log(validpwd);
            if (!validpwd) {
                newUSer.password = await hashedPwd(newUSer.password);
              await User.findByIdAndUpdate(req.params.userId, newUSer);
              res.status(200).json(newUSer);
            }
            else {
                newUSer.password=userCheck.password;
                const user = await User.findByIdAndUpdate(req.params.userId, newUSer);
                res.status(200).json(newUSer);
            }
        }
        else{
            const user = await User.findByIdAndUpdate(req.params.userId, newUSer);
            res.status(200).json(newUSer);

        }
        
     next();
    }
    catch (ex) {
        res.status(400).send('invalid token.')
    }
       
    },

    deleteUser: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;

        const user = await User.findByIdAndRemove(req.params.userId).exec(function (err, item) {
            if (err) {
                return res.json({ success: false, msg: 'Cannot remove item' });
            }
            if (!item) {
                return res.status(404).json({ success: false, msg: 'User not found' });
            }
            res.json({ success: true, msg: 'User deleted.' });
        });
        
     next();
    }
    catch (ex) {
        res.status(400).send('invalid token.')
    }
    },
    deleteAll: async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) res.status(401).send('access denied . No Token Provided.');
        try {
            const decodedPayload = jwt.verify(token, "jwtPrivateKey");
            req.user = decodedPayload;

        const users = await User.deleteMany();
        res.status(200).json('success');
        


     next();
    }
    catch (ex) {
        res.status(400).send('invalid token.')
    }
    },
    sendemail: async (req, res, next) => {
        let user = await User.findOne({ email:req.body.email });
        if (!user) return res.status(400).send('user not registred');
       
        const token = jwt.sign({
                _id:user._id,firstName:user.firstName,lastName: user.lastName,Role:user.Role,
                iss: 'habibdaou',
                sub: user.id,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            }, JWT_SECRET);


        let transporter = nodemailer.createTransport({
                port:587,
                secure:false,
                service: 'gmail',
                auth: {
                        user: "nolivetg@gmail.com",
                        pass: "mdrlol23",
                }
        });
        let mailOptions = {

                from: 'nolivetg@gmail.com',
                to: user.email,
                subject: 'Reset Password',
                text: 'Welcome to ower application if you need to navigate to this link to reset your password http://localhost:4200/auth/forgotPassword/'+token
        }

        transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                        console.log(err);
                        res.status(400).json({error:"Error"});
                } else {
                        console.log('email sent!! ');
                        res.status(200).json({Sucess:"sucess"});
                }

        })


},
addEmployeeToEntreprise: async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already registred');
    var s =[] ;
    user = new User(req.body);
    user.creation_dt = Date.now();
    user.password = await hashedPwd(req.body.password);
    user.imageUrl = req.body.imageUrl;
    user.Role="EMPLOYEE";
    const entreprise = await Entreprise.findById(req.params.entrepriseId)
    user.entreprise.push(entreprise);
    await user.save();

    res.status(201).json((user));
},


getEmployeeByEntreprise: async (req, res, next) => {
   var ListUsers=[];
    const user = await User.find({Role:"EMPLOYEE"}).populate("entreprise");
    user.forEach(data=>{
            data.entreprise.forEach(res=>{
                    if (res._id == req.params.entrepriseId){
                            ListUsers.push(data);
                            
                    }

            })
    })



    res.status(200).json(ListUsers);
},
ConvertImage: async (req, res, next) => {
    var THREEx = THREEx || {}

    THREEx.ArPatternFile = {}
    
    THREEx.ArPatternFile.toCanvas = function(patternFileString, onComplete){
        console.assert(false, 'not yet implemented')
    }
    
    //////////////////////////////////////////////////////////////////////////////
    //		function to encode image
    //////////////////////////////////////////////////////////////////////////////
    
    THREEx.ArPatternFile.encodeImageURL = function(imageURL, onComplete){
        var image = new Image;
        image.onload = function(){
            var patternFileString = THREEx.ArPatternFile.encodeImage(image)
            onComplete(patternFileString)
        }
        image.src = imageURL;
    }
    
    THREEx.ArPatternFile.encodeImage = function(image){
        // copy image on canvas
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d')
        canvas.width = 16;
        canvas.height = 16;
    
        // document.body.appendChild(canvas)
        // canvas.style.width = '200px'
    
    
        var patternFileString = ''
        for(var orientation = 0; orientation > -2*Math.PI; orientation -= Math.PI/2){
            // draw on canvas - honor orientation
            context.save();
             context.clearRect(0,0,canvas.width,canvas.height);
            context.translate(canvas.width/2,canvas.height/2);
            context.rotate(orientation);
            context.drawImage(image, -canvas.width/2,-canvas.height/2, canvas.width, canvas.height);
            context.restore();
    
            // get imageData
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    
            // generate the patternFileString for this orientation
            if( orientation !== 0 )	patternFileString += '\n'
            // NOTE bgr order and not rgb!!! so from 2 to 0
            for(var channelOffset = 2; channelOffset >= 0; channelOffset--){
                // console.log('channelOffset', channelOffset)
                for(var y = 0; y < imageData.height; y++){
                    for(var x = 0; x < imageData.width; x++){
    
                        if( x !== 0 ) patternFileString += ' '
    
                        var offset = (y*imageData.width*4) + (x * 4) + channelOffset
                        var value = imageData.data[offset]
    
                        patternFileString += String(value).padStart(3);
                    }
                    patternFileString += '\n'
                }
            }
        }
    
        return patternFileString
    }
    
    //////////////////////////////////////////////////////////////////////////////
    //		trigger download
    //////////////////////////////////////////////////////////////////////////////
    
    THREEx.ArPatternFile.triggerDownload =  function(patternFileString, fileName = 'pattern-marker.patt'){
        // tech from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
        var domElement = window.document.createElement('a');
        domElement.href = window.URL.createObjectURL(new Blob([patternFileString], {type: 'text/plain'}));
        domElement.download = fileName;
        document.body.appendChild(domElement)
        domElement.click();
        document.body.removeChild(domElement)
    }
    
    THREEx.ArPatternFile.buildFullMarker =  function(innerImageURL, pattRatio, size, color, onComplete){
        var whiteMargin = 0.1
        var blackMargin = (1 - 2 * whiteMargin) * ((1-pattRatio)/2)
        // var blackMargin = 0.2
    
        var innerMargin = whiteMargin + blackMargin
    
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d')
        canvas.width = canvas.height = size
    
        context.fillStyle = 'white';
        context.fillRect(0,0,canvas.width, canvas.height)
    
        // copy image on canvas
        context.fillStyle = color;
        context.fillRect(
            whiteMargin * canvas.width,
            whiteMargin * canvas.height,
            canvas.width * (1-2*whiteMargin),
            canvas.height * (1-2*whiteMargin)
        );
    
        // clear the area for innerImage (in case of transparent image)
        context.fillStyle = 'white';
        context.fillRect(
            innerMargin * canvas.width,
            innerMargin * canvas.height,
            canvas.width * (1-2*innerMargin),
            canvas.height * (1-2*innerMargin)
        );
    
    
        // display innerImage in the middle
        var innerImage = document.createElement('img')
        innerImage.addEventListener('load', function(){
            // draw innerImage
            context.drawImage(innerImage,
                innerMargin * canvas.width,
                innerMargin * canvas.height,
                canvas.width * (1-2*innerMargin),
                canvas.height * (1-2*innerMargin)
            );
    
            var imageUrl = canvas.toDataURL()
            onComplete(imageUrl)
        })
        innerImage.src = innerImageURL
    }
    
}
}