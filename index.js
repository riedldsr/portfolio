const express = require('express')
const nodemailer = require("nodemailer")
const app = express()
const port = 8080

app.use(express.urlencoded({ extended: false }))

app.post('/emails', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');

  	const transporter = nodemailer.createTransport({
	  	service: 'gmail',
	  	auth: {
			user: '<source email>',  // Fill in with real source email
		  	pass: '<password>'  // Fill in with real source email password
	  }
  });

  const mailOptions = {
		to: '<destination email>',  // Fill in with real destination email
		subject: "Message from " + req.body.inputName + ": " + req.body.inputSubject,
		text: req.body.inputMessage + '\n\nFrom: ' + req.body.inputEmail
  };

  transporter.sendMail(mailOptions, (error, info) => {
	if(error){
		console.error(error);
		res.send('error');
	} else {
		res.send('success');
	}
  });

})

app.listen(port, () => {
  console.log(`The server is running at http://localhost/${port}`)
})