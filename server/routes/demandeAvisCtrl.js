var models      = require('../models/');
var jwtUtils = require('../utils/jwt.utils');

module.exports = {
    add: function (req, res) { 
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var medRequisId =req.body.requis
        var medRequerantId =req.body.requerant
        var commentaire = req.body.commentaire
        var files = req.body.files

        if (userId < 0)
            return res.status(400).json({ 'error': "Token invalide !" })
        else {
            models.DemandeAvis.create({
                medRequerantId,
                medRequisId,
                commentaire,
                file1: files[0].data,
                file2: files[1].data,
                file3: files[2].data
            })
                .then(avis => {
                    return res.status(201).json({'avisId':avis.id})
                })
                .catch(err => {
                    return res.status(500).json({ error: err })
                })
        }
    },

    getDemandes: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var id = req.query.id
        var type = req.query.type

        if (userId < 0)
            return res.status(400).json({ 'error': "Token invalide !" })

        else { 
            if (type == 'requis') {
                models.DemandeAvis.findAll({
                    where: { medRequisId: id },
                    order:[['createdAt', 'DESC']],
                    include: [{
                        model: models.Medecin,
                        as: "medRequerant",
                            include: [
                                {
                                    model: models.User,
                                    attributes: ['id', 'first_name', 'last_name', 'phone_number', 'address'],
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
                    }]
                }).then(avis => {
                    if(avis.length > 0)
                        res.status(201).json({ avis })
                    else
                    res.status(201).json({ avis :0})
                }).catch(err => {
                    res.status(500).json({ error: "Une erreur est survenue ! Veuillez reessayer ",err })
                })
            }
            else if (type == 'requerant') {
                models.DemandeAvis.findAll({
                    where: { medRequerantId: id },
                    order:[['createdAt', 'DESC']],
                    include: [{
                        model: models.Medecin,
                        as: "medRequis",
                            include: [
                                {
                                    model: models.User,
                                    attributes: ['id', 'first_name', 'last_name', 'phone_number', 'address'],
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
                    }]
                }).then(avis => {
                    if(avis.length > 0)
                        res.status(201).json({ avis })
                    else
                    res.status(201).json({ avis :0})
                }).catch(err => {
                    res.status(500).json({ error: "Une erreur est survenue ! Veuillez reessayer ",err })
                })
            }
       }
    },

    sendReponse: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var id = req.body.id
        var reponse = req.body.reponse

        if (userId < 0)
            return res.status(400).json({ 'error': "Token invalide !" })

        else {
            models.DemandeAvis.findOne({
                attributes: ['id', 'reponse','statut'],
                where: {id}
            }).then(function (demandeFound) {
                if (demandeFound) {
                    demandeFound.update({
                        reponse,
                        statut: 2
                    })
                    .then( res.status(201).json({'avisId':demandeFound.id}))
                    .catch(err => {
                        res.status(500).json({ 'error': "Erreur lors de la modification du profil", err });
                    })
                }
                else {
                    res.status(404).json({'error': 'Demande non trouvée !'})
                }
            })
            .catch(function (err) {
                res.status(404).json({ error: "Demande non trouvée !", err })
            })
        }
    },

    updateStatut: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var id = req.body.id
        var statut = req.body.status

        if (userId < 0)
            return res.status(400).json({ 'error': "Token invalide !" })

        else {
            models.DemandeAvis.findOne({
                attributes: ['id', 'statut'],
                where: { id }
            })
                .then(function (dmdFound) {
                    if (dmdFound) {
                        dmdFound.update({
                        statut
                    })
                    .then( res.status(201).json(dmdFound))
                    .catch(err => {
                        res.status(500).json({ 'error': "Erreur lors de la mise à jour de la demande", err });
                    })
                }
                })
                .catch(function (err) {
                    res.status(404).json({ error: "Demande non trouvée", err })
                })
        }
    }
}