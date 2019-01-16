import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

//Import User Model
import User from "../models/userSchema";

//Import Jwt Key
import { JWT_KEY } from "../config/keys";

export default (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = JWT_KEY;

  passport.use(new Strategy(opts, (jwt_payload, done) => {
    let id = jwt_payload.user._id;
    User
      .findOne({ _id: id })
      .exec()
      .then(user => {
        if (user) {
          return done(null, user);
        } 
        return done(null, false);
      })
      .catch(err => {
        return done(err, false);
      });
  }));
}