<h1>BaaS for Campaigning</h1>

<h3>Setup</h3>
<ol>
<li>sudo npm install sails -g; sudo npm install</li>
<li>cd frontend; npm install; bower install; gulp</li>
<li>cd ../; sails lift</li>
<li>visit http://localhost:1337</li>
</ol>

<h3>Public Routes</h3>
<p>/auth/signup -post</p>
<p>/auth/login -post</p>
```
{
	email: 'string',
	password: 'string'
}
```
<p>/petition/:id -get</p>
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
<p>/petition/:id -post</p>
```
{
	user: 'integer',
	first_name: 'string',
	last_name: 'string',
	email: 'string',
	image: 'string',
	message: 'string',
    postcode: 'integer',
    location: ['latitude', 'longditude'](array) or 'ip address'(string),
    custom: 'json'
}
```
<p>/petition/:id/feed -get</p>
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
```
<h3>Private Routes</h3>
<p>/user/:id -get -put</p>
<p>/campaign/:id -get -post -put -delete</p>
<p>/campaign/:id/admin -post -delete</p>
<p>/campaign/:id/petition/:childid -get -post -update -delete</p>

<h3>Private Route Rules</h3>
<ol>
<li>"id" param in route kept for campaign id only. Required for ownership check.</li>
</ol>

<h3>Security</h3>
<p>Uses JWT for authentication to private routes - Frontend examples to connect for <a href="https://github.com/sahat/satellizer">Angular (Can also be used with Ionic for mobile)</a>, <a href="https://github.com/jpadilla/ember-cli-simple-auth-token">Ember</a></p>
<p>CORS for cross site access</p>
<p>CSRF on all private routes</p>
<p>Public routes have confidential information stripped</p>

<h3>Uses</h3>
<p>Sails.js, Angular, Gulp, Less, Jade, Mongodb</p>