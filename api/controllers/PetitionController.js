/**
 * Petition_actionController
 *
 * @description :: Server-side logic for managing petition_actions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res) {

		// Find action record and insert submission
		Action.findOne(req.param('id'))
			.populate('campaign')
			.exec(saveSubmission);

		function saveSubmission(err, record) {
			// Check if error
			if(err) return res.json(403, { err: err });

			// Insert relations/variables into model
			req.body.campaign = record.campaign.id;
			req.body.action = req.param('id');
			req.body.type = record.type;

			// Create record
			Submission.create(req.body)
				.exec(function(err, record){
				  	if(err) return res.json(403, { err: err });

				  	// Return new record
	  				return res.json(200, record);
	  			});
		}
	},
};

