/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	subscribe: function(req, res) {
		
		var data = {
	        from:         req.param('email'),
	        subject:      'New Signup',
	        messageHtml:  req.param('email') + ' just subscribed.'
	    };
		
		//email is empty	
		if(!req.param('email')) return res.json(404, {err: 'Must Enter Email'});

		// send email
	    nodemailer.send(data, function(err, response){
	            sails.log.debug('nodemailer sent', err, response);
	            res.json(200, {success: true});
	    });
		
	}
	
};

