import express from "express";
import passport from "passport";
const router = express.Router();

//@Description > Get Current User & DashBoard
//@Route > /user/current
//@Access Control > Private
router.route('/dashboard').get(passport.authenticate('jwt',{session:false}), (req, res, next) => {
  let currentUser = req.user;
  if (!currentUser) {
    return res.status(404).json({
      message: `no user found...`
    });
  }
  return res.status(200).json(currentUser);
});

export default router;