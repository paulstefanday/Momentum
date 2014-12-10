module.exports = function(req, res, next) {
	
	var campaignId = req.param('id');
	var currentUserId = req.token.sub;

	return Campaign.findOne(campaignId).populate('admin', { id: currentUserId }).exec(function(err, campaign) {
	  	
	  	if(err) return res.json(403, err);
	  	var user = campaign.admin[0];

	  	// no user found
	  	if(!user) return res.json(403, {err: 'No user record'});
	  	
	  	// if user isn't admin then return error
	  	if(currentUserId != user.id) return res.json(403, {err: 'You are not allowed to do that'});

	  	next();

	});

 };