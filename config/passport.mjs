import _ from "lodash";

import passport from "passport"
import passportJWT from "passport-jwt";

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'tasmanianDevil';


var users = [
    {
        id: 1,
        name: 'filipe',
        password: '12345'
    },
    {
        id: 2,
        name: 'test',
        password: 'test'
    }
];

const initializePassport = (passport) => {
    var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
        // usually this would be a database call:
        var user = users[_.findIndex(users, { id: jwt_payload.id })];
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });

    passport.use(strategy);
}

export default initializePassport;





