import { Strategy, ExtractJwt } from "passport-jwt";
import { model } from "mongoose";
const User = model("User");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
  passport.use(
    new Strategy(options, ({ id }, done) => {
      User.findById(id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
