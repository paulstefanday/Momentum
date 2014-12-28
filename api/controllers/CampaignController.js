/**
 * CampaignController
 *
 * @description :: Server-side logic for managing campaigns
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



module.exports = {

	find: function (req, res) {
		var currentUserId = req.token.sub;
		User.findOne(currentUserId).populate('admin')
			.exec(function(err,record){
  				if(err) return res.json(403, { err: err });
  				return res.json(200, record.admin);
  		});
	},

	create: function (req, res) {
		Campaign.create(req.body).exec(function(err,created){
  			created.admin.add(req.token.sub);
  			created.save(function(err) { 
  				if(err) return res.json(403, { err: err });
  				return res.json(200, created);
  			});	
  		});
	},

	update: function (req, res) {
		//remove any access params
		var data = req.body;
		delete data.admin;
		delete data.staff;

		Campaign.update(req.param('id'), data).exec(function(err, campaign) {
			if(err) return res.json(403, err);
			return res.json(200, campaign);
		});
	},

	addAdmin: function (req, res) {
		Campaign.findOne(req.param('id')).exec(function(err,campaign){
  			campaign.admin.add(req.param('user'));
  			campaign.save(function(err) { 
  				if(err) return res.json(403, { err: err });
  				return res.json(200, campaign);
  			});
  		});
	},

	removeAdmin: function (req, res) {
		Campaign.findOne(req.param('id')).exec(function(err,campaign){
  			campaign.admin.remove(req.param('user'));
  			campaign.save(function(err) { 
  				if(err) return res.json(403, { err: err });
  				return res.json(200, campaign);
  			});
  		});
	}




};

