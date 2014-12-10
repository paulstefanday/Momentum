/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var expiry = new Date();
expiry.setDate(expiry.getDate() + 10);
expiry = parseInt( expiry / 1000 );


module.exports = {
	login: function(req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password) {
      return res.json(401, {err: 'username and password required'});
    }

    User.findOneByEmail(email, function(err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid username or password'});
      }

      User.validPassword(password, user, function(err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid username or password'});
        } else {
          res.json(200, {user: user, token: sailsTokenAuth.issueToken({sub: user.id, exp: expiry })});
        }
      });
    })
  },

  signup: function(req, res) {
    //TODO: Do some validation on the input
    // if (req.body.password !== req.body.confirmPassword) {
    //   return res.json(401, {err: 'Password doesn\'t match'});
    // }

    User.create({email: req.body.email, password: req.body.password}).exec(function(err, user) {
      if (err) {
        res.json(err.status, {err: err});
        return;
      }
      if (user) {
        res.json(200, {user: user, token: sailsTokenAuth.issueToken({sub: user.id, exp: expiry })});
      }
    });
  }
};