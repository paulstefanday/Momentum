module.exports = function(req, res, next) {
	
	var campaignId = req.param('id');
	var currentUserId = req.token.sub;
	
	return Campaign.findOne(campaignId).populate('admin', { id: currentUserId }).exec(function(err, campaign) {
	  	
	  	if(err) return res.json(403, err);

	  	if(!campaign) return res.json(403, {err: 'This campaign does not exist'});	
	  	
	  	// no user found
	  	if(!campaign.admin[0]) return res.json(403, {err: 'You are not an admin of this campaign'});	
		var users = campaign.admin;

	  	// if user isn't admin then return error
	  	var user = users[0];
	  	if(currentUserId != user.id) return res.json(403, {err: 'You are not allowed to do that'});

	  	next();

	});

 };