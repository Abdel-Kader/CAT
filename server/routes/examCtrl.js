var models = require("../models");
var jwtUtils = require("../utils/jwt.utils");

//Routes
module.exports = {
    getAll: function (req, res) {
        var headerAuth = req.headers["authorization"];
        var userId = jwtUtils.getUserId(headerAuth);
        
        if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
        else {
            models.exam.findAll({}).then(exams => {
                res.status(201).json({exams})
            })
            .catch((err) => {
                res
                    .status(500)
                    .json({ error: "Une erreur est survenue ! Veuillez reessayer " });
            });
        }
    }
}