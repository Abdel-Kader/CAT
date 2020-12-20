var models      = require('../models/');

module.exports = {
    add: function(req, res)  {
        var libelle = req.body.libelle;

        if(libelle == null)
        {
            res.status(400).json({error: 'Le nom du service est obligatoire'})
        }
        else 
        {
            models.Service.create({
                libelle
            })
            .then(function(service) {
                res.status(201).json({
                    'serviceId': service.id
                })
            }).catch(err=> {
                res.status(500).json({error: 'Une erreur est survenue ',err})
            })
        }
    },

    getAll: function(req, res) {
        models.Service.findAll({})
            .then(services => {
                res.status(201).json(services)
            })
            .catch(err=> {
                res.status(500).json({error: 'Une erreur est survenue ',err})
            })
    }
       
}