var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
const { Op } = require("sequelize");

//Routes
module.exports = {

    getById: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var id = req.query.id
        
        if (userId < 0)
            return res.status(400).json({ 'error': "Token invalide !" })
        else {
            models.Patient.findOne({
                where: { id },
                include: [
                    { 
                        model: models.User,
                        attributes: ['first_name', 'last_name', 'phone_number', 'email', 'address'] 
                    }]
            }).then(function (patientFound) {
                if (!patientFound)
                    return res.status(500).json({ error: 'user not existed !' })
                else 
                    res.status(201).json(patientFound)
            }).catch((err) => {
                res.status(500).json({ 'error': err })
            })
        }
    }
}