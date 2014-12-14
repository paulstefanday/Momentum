/**
 * PetitionController
 *
 * @description :: Server-side logic for managing petitions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	create: function (req, res) {
		Petition.create(req.body).exec(function createCB(err,created){
  			created.campaign.add(req.param('id'));
  			created.save(function(err) { 
  				if(err) return res.json(403, { err: err });
  				return res.json(200, created);
  			});
  			
  		});
	},

	update: function (req, res) {
		Petition.update(req.param('id'), data).exec(function(err, updated) {
			if(err) return res.json(403, err);
			return res.json(200, updated);
		});
	},

};

