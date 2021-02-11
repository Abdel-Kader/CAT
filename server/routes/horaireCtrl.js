var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

async function addHoraireDetail(HoraireId, date, heure_debut, heure_fin) {
   models.DetailHoraire.create({
        HoraireId ,
        date,
        heure_debut,
        heure_fin
    })
}


module.exports = {
  /*  add: function (req, res) {
        
        var semaine = req.body.semaine
        var mois = req.body.mois
        var detail = req.body.detail;
        var obj = JSON.parse(detail)
        var medecinId = req.body.medecinId

        models.Horaire.create({
            semaine,
            mois
        }).then(function (horaire) {
            Object.keys(obj).forEach(det => {
                console.log(obj[det]['jour'])
                addHoraireDetail(horaire.id, obj[det]['jour'], obj[det]['heure_debut'], obj[det]['heure_fin'])
            })
            models.HoraireMedecin.create({
                medecinId,
                horaireId: horaire.id
            })
            return res.status(201).json({ 'horaireId': horaire.id })
        })

        .catch(function (err) {
            return res.status(500).json({ error: "une erreur est survenue ! Veuillez reessayer", err });
        });

    }*/

    add: function (req, res) {
        var type = req.body.type
        var start = req.body.start
        var end = req.body.end
        var medecinId = req.body.medecinId
            models.Horaire.create({
                type,
                start,
                end
            }).then(horaire => {
                models.HoraireMedecin.create({
                    medecinId,
                    horaireId: horaire.id
                })
                return res.status(201).json({ 'horaireId': horaire.id })
        }).catch(function (err) {
            return res.status(500).json({ error: err });
        });
    },

    getByUser: function (req, res) {
        var id = req.query.id
        var type = req.query.type

        models.Horaire.findAll({
            where: { type },
            include: [
                {
                    model: models.Medecin,
                    include: [
                        {
                            model: models.User,
                            attributes: ['id', 'first_name', 'last_name', 'phone_number', 'address', 'email'],
                        },
                        {
                            model: models.Specialite,
                            as: "specialite",
                            attributes: ['id', 'libelle'],
                        },
                        {
                            model: models.Service,
                            as: "service",
                            attributes: ['id', 'libelle'],
                        }
                    ],
                    attributes: ["id"],
                    where: { id: id },
                    as: "medecins",
                  through: {
                    attributes: [],
                  }
                 
                },
              ],
        }).then(rest => {
            res.status(201).json({disponibilities:rest})
        }).catch(function (err) {
            return res.status(500).json({ error: "une erreur est survenue ! Veuillez reessayer", err });
        });
    }
}