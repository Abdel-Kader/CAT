var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
const { Op } = require("sequelize");

//Routes
module.exports = {
    getAll: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        if (userId < 0)
            return res.status(400).json({ 'error': "Token invalide !" })
        else {
            
            models.Medecin.findAll({
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
                    { 
                        model: models.Horaire,
                        as: "horaires",
                        where: {
                            'start': {
                                [Op.gte]: new Date()
                        } }
                    }
                ]
            }).then(medecins => {
                if(medecins)
                    res.status(201).json(medecins)
                else
                    res.status(400).json({error: 'Aucun médecin trouvé !'})
            }).catch((err) => {
                res.status(500).json({ 'error': err })
            })
        }
    },

    getBySpecialite: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
      /*  if (userId < 0)
            return res.status(400).json({ 'error': "Token invalide !" })
        else {
            */
            models.Medecin.findAll({
                group: ['specialite.id'],
                include: [
                    { 
                        model: models.User,
                        attributes: ['first_name', 'last_name', 'phone_number', 'email', 'address'] 
                    },
                    { 
                        model: models.Specialite,
                        attributes: ['libelle']
                    },
                    { 
                        model: models.Service,
                        attributes: ['libelle']
                    },
                    { 
                        model: models.Horaire,
                        as: "horaires",
                        where: {
                            'start': {
                                [Op.gte]: new Date()
                        } }
                    }
                ]
            }).then(medecins => {
                if(medecins)
                    res.status(201).json(medecins)
                else
                    res.status(400).json({error: 'Aucun médecin trouvé !'})
            }).catch((err) => {
                res.status(500).json({ 'error': err })
            })
       // }
    },
    getById: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var id = req.query.id
        
        if (userId < 0)
            return res.status(400).json({ 'error': "Token invalide !" })
        else {
            models.Medecin.findOne({
                where: { id },
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
                    { 
                        model: models.Horaire,
                        as: "horaires",
                        where: {
                            'start': {
                                [Op.gte]: new Date()
                        } }
                    }
                ]
            }).then(function (medecinFound) {
                if (medecinFound)
                    res.status(201).json(medecinFound)
                else 
                    return res.status(500).json({ error: 'user not existed !' })
            }).catch((err) => {
                res.status(500).json({ 'error': err })
            })
        }
            
    }
}