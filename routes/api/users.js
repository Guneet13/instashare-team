const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../../models/User");
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken'); // generate token
const Keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');

// @route POST /api/users/register
// @desc Register a user
// @access Public
router.post('/register', (req, res) => {

  //validate user's input
  const result = validateRegisterInput(req.body);
  console.log(result);
  if (!result.isValid){
    //meaning there are error
    return res.status(400).json(result.errors);
  }


  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {

        const avatar = gravatar.url(req.body.email,{
          s:'200',
          r:'pg',
          d:'mm'
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        }) // end of newUser registration

        //hash password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          }
          );// end of bcrypt.hash
        }//end of genSalt call back
        );
      } // end of else
    })  //end of findOne.then
    .catch(err => console.log(err)) //end of findOne.catch
} // end of (req,res)
)// end of router.post


// @route POST /api/users/login
// @desc Login a user
// @access Public
router.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    //check if user exists
    if(!user){ // if user not found
      return res.status(400).json({email: 'User not found!'})
    }
    //check the password
    bcrypt.compare(req.body.password, user.password)
      .then(isMatch => {
        if(!isMatch){
          return res.status(400).json({password: 'Password incorrect'});
        }else{
          //generate token
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };
          jwt.sign(
            payload ,
            Keys.secretOrKey,
            {expiresIn: 3600},//3600seconds is 1 hour
            (err, token) => {
              return res.json({token: 'Bearer '+token})
            });
        }
      })
  })
})

// @route   GET /api/users/current
// @desc    Return current user info
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json(req.user);
});



module.exports = router;
