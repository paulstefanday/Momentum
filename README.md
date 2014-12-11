<h1>BaaS for Campaigning</h1>

<h3>Setup</h3>
<ol>
<li>1. sudo npm install sails -g; sudo npm install</li>
<li>2. cd frontend; npm install; bower install; gulp</li>
<li>3. cd ../; sails lift</li>
<li>4. visit http://localhost:1337</li>
</ol>

<h3>Public Routes</h3>
<p>/auth/signup -post</p>
<p>/auth/login -post</p>

<h3>Private Routes</h3>
<p>/user/:id -get -put</p>
<p>/campaign/:id -get -post -put -delete</p>
<p>/campaign/:id/admin -post -delete</p>

<h3>Security</h3>
<p>CORS for cross site access</p>
<p>CSRF on all private routes</p>
<p>Public routes have confidential information stripped</p>

<h3>Uses</h3>
<p>Sails.js, Angular, Gulp, Less, Jade, Mongodb</p>