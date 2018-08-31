import passportJWT from "passport-jwt";

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

import knex from "./db"

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'tasmanianDevil';


const initializePassport = (passport) => {
    var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
        // usually this would be a database call:
        knex("user").select("*").where({ id: jwt_payload.id }).then((result) => {
            if (result[0]) {
                next(null, result[0]);
            } else {
                next(null, false);
            }

        })

    });

    passport.use(strategy);
}

export default initializePassport;





