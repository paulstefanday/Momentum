/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	subscribe: function(req, res) {
		
		var data = {
              name:       'Momentum User',
              from:       req.param('email'),
              to:         'paul@paulday.com.au',
              subject:    'New Signup',
              messageHtml: req.param('email') + ' just subscribed.'
        };
		
		nodemailer.send(data, function(err, response){
              sails.log.debug('nodemailer sent', err, response);

              res.json(200, {success: true});
        });

		
	}
	
};

