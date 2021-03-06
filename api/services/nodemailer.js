var nodemailer = require('nodemailer');
module.exports = {

  /**
   * Sends an email to a given recipient
   * @param  {object}   email           an object containing all of the necessary data to email
   * @param  {Function} cb[err, res]    the callback to call once email is sent, or if it fails
   */
  send: function(email, cb){

    /** sets up the modemailer smtp transport */
    var transport = nodemailer.createTransport("SMTP", {
      service: "Mandrill",
      auth: {
          user: "paul@paulday.com.au",
          pass: "yCDYXFq-NPFYRwTWsX8RuA"
      }
    });

    /** sets up the mail options, from and such like that **/
    var from    = email.from || 'info@momentum.build';
    var name    = email.name || 'Momentum'
    var subject = email.subject || 'Momentum Email Message';
    var to      = email.to || "paul@paulday.com.au"; 

    var mailOptions = {
      from: name + '<' + from + '>',
      to: to,
      subject: subject,
      html: email.messageHtml
    }

    /** Actually sends the email */
    transport.sendMail(mailOptions, function(err, response){
      if(err) return cb(err);
      return cb(null, response);
    });
  }
}