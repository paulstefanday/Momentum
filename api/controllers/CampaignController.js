/**
 * CampaignController
 *
 * @description :: Server-side logic for managing campaigns
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	// find: function (req, res) {
	// 	return Campaigns.find().exec(function(err, message) {
	// 		return res.json({ data: message});
	// 	});
	// },

	create: function (req, res) {
		return Campaigns.create(req.params).exec(function createCB(err,created){
  			created.admin.add(req.token.sub);
  			created.save();
  			return res.json(created);
  		});
	},

	update: function (req, res) {
	    return res.json({
	      todo: 'Not implemented yet!'
	    });
	  },

	destroy: function (req, res) {
	    return res.json({
	      todo: 'Not implemented yet!'
	    });
	}
	
};

