var models      = require('../models/');
var jwtUtils = require('../utils/jwt.utils');

module.exports = {
    add: function(req, res)  {
        var libelle = req.body.libelle;

        if(libelle == null)
        {
            res.status(400).json({error: 'Le nom de la spécialité est obligatoire'})
        }
        else 
        {
            models.Specialite.create({
                libelle
            })
            .then(function(specialite) {
                res.status(201).json({
                    'specialiteId': specialite.id
                })
            }).catch(err=> {
                res.status(500).json({error: 'Une erreur est survenue ',err})
            })
        }
    },

    getAll: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        if (userId < 0)
            return res.status(400).json({ 'error': "Token invalide !" })
        else {
            models.Specialite.findAll({
                include: [
                    {
                        model: models.Medecin,
                        as: 'medecins',
                        include: [
                            {
                                model: models.User,
                                attributes: ['id', 'first_name', 'last_name', 'phone_number', 'address', 'email'],
                            },
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
                            // { 
                            //     model: models.Horaire,
                            //     as: "horaires",
                            //     where: {
                            //         'start': {
                            //             [Op.gte]: new Date()
                            //     } }
                            // }
                            
                        ]
                    }
                ]
            })
                .then(specialites => {
                    res.status(201).json({specialites})
                })
                .catch(err=> {
                    res.status(500).json({error: 'Une erreur est survenue ',err})
                })
        }
    },

    getSpecialites: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        if (userId < 0)
            return res.status(400).json({ 'error': "Token invalide !" })
        else {
            models.Specialite.findAll({
            }).then(specialites => {
                res.status(201).json({specialites})
            })
            .catch(err=> {
                res.status(500).json({error: 'Une erreur est survenue ',err})
            })
        }
    }
       
}