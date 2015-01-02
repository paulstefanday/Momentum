<h1>BaaS for Campaigning</h1>

<h3>Setup</h3>
<ol>
<li>sudo npm install sails -g; sudo npm install</li>
<li>cd frontend; npm install; bower install; gulp</li>
<li>cd ../; sails lift</li>
<li>visit http://localhost:1337</li>
</ol>

<p><b>Live Example: http://www.momentum.build</b></p>

<h3>Security</h3>
<ol>
<li>Uses <a href="https://github.com/sahat/satellizer">JWT for authentication</a> for user login and private routes - Frontend examples to connect for <a href="https://github.com/sahat/satellizer">Angular</a>, <a href="http://ionicframework.com/" >Ionic</a> and <a href="https://github.com/jpadilla/ember-cli-simple-auth-token">Ember</a></li>
<li>CORS turned off for all private routes becides user access</li>
<!-- <p>CSRF on all private routes</p> -->
<li>Public routes have confidential information stripped</li>
</ol>

<h3>Uses</h3>
<p>Sails.js, Angular, Gulp, Less, Jade, Mongodb</p>

<h3>Public Routes (<a href="https://github.com/MomentumBuild/petition/blob/master/core/petition/app/service.js">Basic public routes using an angular service</a>)</h3>
<p>/auth/signup -post</p>
<p>/auth/login -post</p>
```
{
	email: 'string',
	password: 'string'
}
```
<p>/campaign/:id/action/:actionid -get</p>
```
{
	title: {
		type: 'string',
		required: true
	},
	description: {
		type: 'string',
		required: true
	},
	type: {
		type: 'string',
		required: true
	},
	owner: '/campaign/:id',
	actions: '/petition/:id/feed'
}
```
<p>/campaign/:id/action/:actionid/feed -get (object is the same as post object below)</p>
```
{
	[object,object,object,etc]
}
```
<p>/petition/:id -post ('petition' can be be changed to access any of the other types of actions that come with specific validations. Swap 'petition' out for 'email', 'image', 'donation', 'location', 'event')</p>
```
{
    first_name: 'string',
    last_name: 'string',
    profile_image: 'string',
    image: 'string',
    message: 'string',
    voted: 'boolean',
    postcode: 'integer',
    location: 'string',
    url: 'string',
    donation: 'float',
    reward: 'string',
    custom: 'json',
    type: 'string'
    user: { userObject }
}
```
<!-- <p>/petition/:id/feed -get</p>
```
{
	count: 'integer',
	actions: [
		{
		  	first_name: 'string',
		    last_name: 'string',
		    profile: 'string',
		   	image: 'string',
		    postcode: 'integer',
		    location: ['latitude', 'longditude'](array) or 'ip address'(string),
    		custom: 'json'
		    petition: '/petition/:id'
		}
	]
}
``` -->
<h3>Private Routes</h3>
<p>/user/:id -get -put</p>
<p>/campaign/:id -get -post -put -delete</p>
<p>/campaign/:id/admin -post -delete</p>
<p>/campaign/:id/petition/:childid -get -post -update -delete</p>

<h3>Private Route Rules</h3>
<ol>
<li>"id" param in route kept for campaign id only. Required for ownership check.</li>
</ol>

