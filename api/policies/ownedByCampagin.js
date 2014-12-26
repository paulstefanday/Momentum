module.exports = function(req, res, next) {
	
	var actionId = req.param('id');
	var currentUserId = req.token.sub;
	return Action.findOne(actionId).populate('campaign').exec(actionResult);

	function actionResult(err, record) {
		console.log(record);
		return Campaign.findOne(record.campaign.id).populate('admin', { id: currentUserId }).exec(campaignResult);
	}

	function campaignResult(err, record) {
	  	if(err) return res.json(403, err);

	  	if(!record) return res.json(403, {err: 'This campaign does not exist'});	
	  	
	  	// no user found
	  	var users = record.admin;
	  	if(!record.admin) return res.json(403, {err: 'You are not an admin of this campaign'});	

	  	// if user isn't admin then return error
	  	var user = users[0];
	  	if(currentUserId != user.id) return res.json(403, {err: 'You are not allowed to do that'});

	  	next();
	};
 };