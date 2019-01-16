import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

//Import User Model
import User from "../models/userSchema";

//import JWT Token
import { JWT_KEY } from "../config/keys";

const router = express.Router();

//@Description > Get All Users From The DataBase
//@Route > /user
//@Access Control > Public
router.route('/').get((req, res, next) => {
  User
    .find()
    .sort({date:-1})
    .select('name email username date')
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(404).json({
          message: `no users added yet...`
        });
      }
      return res.status(200).json(users);
    })
    .catch(err => {
      return res.status(500).json({
        error: err.message
      });
    });
});

//@Description > Register User
//@Route > /user/register
//@Access Control > Public
router.route('/register').post((req, res, next) => {
  User
    .findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: 'invalid email id...'
        });
      }
      User
        .findOne({ username: req.body.username })
        .exec()
        .then(user => {
          if (user) {
            return res.status(409).json({
              message: 'invalid username...'
            });
          }
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err.message;
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err.message;

              //Let Save User
              let newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash
              });
              return newUser
                .save()
                .then(user => {
                  return res.status(201).json(user);
                })
                .catch(err => {
                  return res.status(500).json({
                    error: err.message
                  });
                });
            });
          });
        })
        .catch(err => {
          return res.status(500).json({
            error: err.message
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        error: err.message
      });
    });
});

//@Description > Delete User
//@Route > /user/:id
//@Access Control > Public
router.route('/:id').delete((req, res, next) => {
  User
    .findOne({ _id: req.params.id })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(409).json({
          message: `user not found...`
        });
      }
      User
        .deleteOne({ _id: req.params.id })
        .exec()
        .then(user => {
          return res.status(200).json({success: true});
        })
        .catch(err => {
          return res.status(500).json({
            error: err.message
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        error: err.message
      });
    });
});

//@Description > Authenticate User
//@Route > /user/authenticate
//@Access Control > Public
router.route('/authenticate').post((req, res, next) => {
  User
    .findOne({ username: req.body.username })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(409).json({
          message: `no user found...`
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) console.log(err);
        if (isMatch) {
          const token = jwt.sign(
            {user},
            JWT_KEY,
            {expiresIn: '1h'}
          );
          res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: {
              name: user.name,
              email: user.email,
              username: user.username,
              id: user._id
            }
          });
        } else {
          return res.status(409).json({
            message: `invalid password...`
          });
        }
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err.message
      });
    });
});

//@Description > Get Current User
//@Route > /user/current
//@Access-Control > Private
router.route('/current').get(passport.authenticate('jwt',{session:false}), (req, res, next) => {
  let currentUser = req.user;
  if (!currentUser) {
    return res.status(409).json({
      message: `user not found...`
    });
  }
  res.status(200).json({
    user: currentUser
  });
});

export default router;