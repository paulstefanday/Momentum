/**
 * PetitionController
 *
 * @description :: Server-side logic for managing petitions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	find: function (req, res) {
		// var actionId = req.param('childid');
		// if(actionId) Action.find().where({id: actionId})
		// 	.exec(function(err,record){
  // 				if(err) return res.json(403, { err: err });
  // 				return res.json(200, record);
  // 			});
		// else 
		Action.find()
			.where({campaign: req.param('id')})
			.populate('submissions')
			.exec(function(err,record){
				console.log(record);
  				if(err) return res.json(403, { err: err });
  				return res.json(200, record);
  			});
	},

	create: function (req, res) {
		req.body.campaign = req.param('id');
		Action.create(req.body)
			.exec(function(err, record){
				console.log(record);
			  	if(err) return res.json(403, { err: err });
  				return res.json(200, record);
  			});
	},

	update: function (req, res) {
		Action.update(req.param('childid'), req.body)
			.exec(function(err, record) {
				if(err) return res.json(403, err);
				return res.json(200, record);
			});
	},

	destory: function (req, res) {
		console.log('child id: ', req.param('childid'));
		Action.destory(req.param('childid'))
			.exec(function(err, record) {
				if(err) return res.json(403, err);
				return res.json(200, record);
			});
	},

};

