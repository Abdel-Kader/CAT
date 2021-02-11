var bcrypt      = require('bcryptjs');
var models      = require('../models/');
var jwtUtils = require('../utils/jwt.utils');
const { Op } = require("sequelize");

//Routes
module.exports = {
    register: function(req, res) {
        //Params
        var first_name      =   req.body.first_name;
        var last_name       =   req.body.last_name;
        var phone_number    =   req.body.phone_number;
        var address         =   req.body.address;
        var email           =   req.body.email;
        // var login           = req.body.login;
        var password        =   req.body.password;
        var specialite      =   req.body.specialite;
        var service         =   req.body.service;

        if(first_name == null || last_name == null || phone_number == null || password == null)
        {
            return res.status(400).json({ 'error': 'missing parameters !'})
        }

        models.User.findOne({
            where: { phone_number: phone_number }
        })
        .then(function(userFound) {
            if(!userFound) {
                bcrypt.hash(password, 10, function( err, bcryptedPassword ) {
                    var newUser = models.User.create({
                        first_name,
                        last_name,
                        phone_number,
                        address,
                        email,
                        password: bcryptedPassword,
                        ProfileId: 1
                    })
                    .then(function(newUser) {
                        models.Medecin.create({
                            UserId: newUser.id,
                            specialiteId: specialite,
                            serviceId: service
                        })
                        // this.addMedecin(newUser.id)
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'cannot add user',err });
                    });
                });
            }
            else {
                return res.status(409).json({ 'error': 'user already exist'})
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user !'})
        })
    },

    registerPatient: function(req, res) {
        //Params
        var first_name      =   req.body.first_name;
        var last_name       =   req.body.last_name;
        var phone_number    =   req.body.phone_number;
        var address         =   req.body.address;
        // var login           = req.body.login;
        var password        =   req.body.password;
        var sexe            =   req.body.sexe;
        var lieu_naissance  =   req.body.lieu_naissance;
        var date_naissance  =   req.body.date_naissance;
        var profession      =   req.body.profession;

        if(first_name == null || last_name == null || phone_number == null || password == null)
        {
            return res.status(400).json({ 'error': 'missing parameters !'})
        }

        // TODO verify pseudo length, mail regex, password etc.


        models.User.findOne({
            where: { phone_number: phone_number }
        })
        .then(function(userFound) {
            if(!userFound) {
                bcrypt.hash(password, 10, function( err, bcryptedPassword ) {
                    models.User.create({
                        first_name,
                        last_name,
                        phone_number,
                        address,
                        password: bcryptedPassword,
                        ProfileId: 2
                    })
                    .then(function(newUser) {
                        models.Patient.create({
                            UserId: newUser.id,
                            date_naissance,
                            lieu_naissance,
                            sexe,
                            profession
                        }).then(function (patient) {
                            return res.status(201).json({
                                'userId': patient.id
                            })
                            
                        }).catch(function(err) {
                            return res.status(500).json({ 'error': err });
                        });
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': err });
                    });
                });
            }
            else {
                return res.status(409).json({ 'error': 'user already exist'})
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'Erreur survenue ! Veuillez reessayer'})
        })
    },

    login: function(req, res) {
        //Params
        var phone_number   = req.body.phone_number;
        var password       = req.body.password;

        if(phone_number == null || password == null) {
            return res.status(400).json({ error: 'missing parameters'})
        } 

        models.User.findOne({
            where: { phone_number: phone_number }
        })
        .then(function(userFound) {
            if(!userFound) {
                return res.status(500).json({ error: 'user not existed !'})
            }
            else {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if(resBycrypt) {
                        if(userFound.ProfileId == 2) {
                            models.Patient.findOne({
                                where: {userId: userFound.id}
                            })
                            .then(patient=> {
                                return res.status(200).json({
                                    'userId': userFound.id,
                                    'profile': userFound.ProfileId,
                                    'id': patient.id,
                                    'first_name'   : userFound.first_name,
                                    'last_name'   : userFound.last_name,
                                    'token': jwtUtils.generateTokenForUser(userFound)
                                })
                            })
                            .catch(err => {
                                res.status(404).json({error: 'Erreur survenue', err})
                            })
                        }
                        else if(userFound.ProfileId == 1) {
                            models.Medecin.findOne({
                                where: {userId: userFound.id}
                            })
                            .then(medecin=> {
                                return res.status(200).json({
                                    'userId': userFound.id,
                                    'profile': userFound.ProfileId,
                                    'id': medecin.id,
                                    'first_name'   : userFound.first_name,
                                    'last_name'   : userFound.last_name,
                                    'token': jwtUtils.generateTokenForUser(userFound)
                                })
                            })
                            .catch(err => {
                                res.status(404).json({error: 'Erreur survenue', err})
                            })
                            
                        }
                        
                    }
                    else {
                        return res.status(403).json({ error: 'Invalid password' })
                    }
                })
            }
        })
        .catch(function(err) {
            return res.status(500).json({ error: 'unable to verify user'})
        })
        
    },

    getUserProfile: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var profile = req.query.profile
        if(userId < 0) 
            return res.status(400).json({'error': 'Token invalide !'})
        
        else {
            if (profile == 1)
            {
                models.Medecin.findOne({
                    where: { UserId: userId },
                    include: [
                        { 
                            model: models.User,
                            attributes: ['first_name', 'last_name', 'phone_number', 'email', 'address'] 
                        },
                        { 
                            model: models.Specialite,
                            as: "specialite",
                            attributes: ['libelle']
                        },
                        { 
                            model: models.Service,
                            as: "service",
                            attributes: ['libelle']
                        },
                    ]
                })
                    .then(user => {
                    if(user)
                        res.status(200).json({user});
                    else    
                        res.status(404).json({'error': "Utilisateur non trouvé !"});
                })
                .catch((err) => {
                    res.status(500).json({'error': err})
                })
            }
            else if (profile == 2) {
                models.Patient.findOne({
                    where: { UserId: userId },
                    include: [
                        { 
                            model: models.User,
                            attributes: ['first_name', 'last_name', 'phone_number', 'email', 'address'] 
                        }
                    ]
                }).then(user => {
                    if(user)
                        res.status(200).json({user});
                    else    
                        res.status(404).json({'error': "Utilisateur non trouvé !"});
                })
                .catch((err) => {
                    res.status(500).json({'error': err})
                })
            }
           
        }
    },

    updateUserProfile: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var phone_number = req.body.phone_number;
        var email = req.body.email;
        var address = req.body.address;

        if (userId < 0)
            return res.status(400).json({'error': 'Token invalide !'})
        else {
            
            models.User.findOne({
                attributes: ['id', 'first_name', 'last_name', 'phone_number', 'address', 'email'],
                where: { id: userId }
            }).then(function (userFound) {
                if (userFound) {
                    userFound.update({
                        first_name: (first_name ? first_name : userFound.first_name),
                        last_name: (last_name ? last_name : userFound.last_name),
                        phone_number: (phone_number ? phone_number : userFound.phone_number),
                        email: (email ? email : userFound.email),
                        address: (address ? address : userFound.address),
                    }).then(function () {
                        res.status(201).json({userUpdated: userFound})
                    }).catch(function (err) {
                        res.status(500).json({ 'error': "Erreur lors de la modification du profil", err });
                    })
                }
            })
                .catch(function (err) {
                    res.status(404).json({ error: "Utilisateur non trouvé ", err })
                })
        
        }
    },
    getUsers: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

      /*  if (userId < 0)
            return res.status(400).json({ 'error': 'Token invalide !' })
        else {*/
            models.User.findAll({
                where: {
                    id: {
                        [Op.ne]: userId
                    }
                },
                attributes: ['id', 'first_name', 'last_name', 'phone_number', 'address', 'email', 'ProfileId'],
                include: [
                    {
                        model: models.Medecin,
                        as: 'medecins',
                        include: [
                            { 
                                model: models.Service,
                                as: "service",
                                attributes: ['libelle']
                            },
                            { 
                                model: models.Specialite,
                                as: "specialite",
                                attributes: ['libelle']
                            },
                                                        
                        ]
                    },
                    {
                        model: models.Patient,
                        as: 'patients'
                    }
                ]
            }).then(users => {
                res.status(201).json({users})
            }).catch(err => {
                res.status(500).json({error: "Une erreur est survenue ! Veuillez ressayer", err})
            })
         //}
    }
}
