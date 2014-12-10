module.exports = function(req, res, next) {
	
	var campaignId = req.param('id');
	var currentUserId = req.token.sub;
	console.log(currentUserId);

	return Campaign.findOne(campaignId).populate('admin', { id: currentUserId }).exec(function(err, campaign) {
	  	console.log(campaign);
	  	if(err) return res.json(403, err);

	  	if(!campaign) return res.json(403, {err: 'This campaign does not exist'});	
	  	
	  	// no user found
	  	var users = campaign.admin;
	  	if(!campaign.admin) return res.json(403, {err: 'You are not an admin of this campaign'});	


	  	// if user isn't admin then return error
	  	var user = users[0];
	  	if(currentUserId != user.id) return res.json(403, {err: 'You are not allowed to do that'});

	  	next();

	});

 };