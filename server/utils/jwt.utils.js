var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '1ejs6gh5km7wxq44pzn3kvpxnpgyyt43ftx8gz17sy6djfnm3uxc65bi8rccxw';
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            profile: userData.ProfileId
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null
    },
    getUserId: function (authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != token)
                    userId = jwtToken.userId;
            }
            catch(err) { }
        }
        return userId
    }
}