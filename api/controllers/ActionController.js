/**
 * PetitionController
 *
 * @description :: Server-side logic for managing petitions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	find: function (req, res) {
		var actionId = req.param('childid');
		if(actionId) Action.find().where({id: actionId})
			.exec(function createCB(err,record){
  				if(err) return res.json(403, { err: err });
  				return res.json(200, record);
  			});
		else Action.find().limit(20)
			.exec(function createCB(err,record){
  				if(err) return res.json(403, { err: err });
  				return res.json(200, record);
  		});
	},

	create: function (req, res) {
		Action.create(req.body).exec(function createCB(err,record){
  			created.campaign.add(req.param('id'));
  			created.save(function(err) { 
  				if(err) return res.json(403, { err: err });
  				return res.json(200, record);
  			});
  			
  		});
	},

	update: function (req, res) {
		Action.update(req.param('childid'), data).exec(function(err, record) {
			if(err) return res.json(403, err);
			return res.json(200, record);
		});
	},

	destory: function (req, res) {
		Action.destory(req.param('childid')).exec(function(err, record) {
			if(err) return res.json(403, err);
			return res.json(200, record);
		});
	},

};

