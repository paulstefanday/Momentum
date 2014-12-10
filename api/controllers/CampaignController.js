/**
 * CampaignController
 *
 * @description :: Server-side logic for managing campaigns
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function (req, res) {
		Campaign.create(req.body).exec(function createCB(err,created){
  			created.admin.add(req.token.sub);
  			created.save(function(err) { 
  				if(err) return res.json({ err: err });
  				return res.json(created);
  			});
  			
  		});
	},

	update: function (req, res) {
		Campaign.update(req.param('id'), req.body).exec(function(err, campaign) {
			if(err) return res.json(403, err);
			return res.json(200, campaign);
		});
	},

	addAdmin: function (req, res) {
		Campaign.findOne(req.param('id')).exec(function createCB(err,campaign){
  			campaign.admin.add(req.param('user'));
  			created.save(function(err) { 
  				if(err) return res.json({ err: err });
  				return res.json(created);
  			});
  		});
	},

	removeAdmin: function (req, res) {

	}




};

