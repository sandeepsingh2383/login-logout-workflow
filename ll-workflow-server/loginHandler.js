var usersList = require('./userList');
function getRandomDelay() {
	return (Math.random() * 10000) / 3;
}

function handleLoginRequest(req, res) {
  var userName = req.body.userName;
  var password = req.body.password;
  var delay = getRandomDelay();
  console.log(req.body);
  console.log(delay);
  setTimeout(function(){
  	var loggedInUser = usersList.filter(function(user) {
  		return user.userName === userName;
	});
	if (loggedInUser.length && loggedInUser[0].password === password) {
		res.json({
			success: true
		});
	} else {
		res.json({
			success: false,
			errorMessage: 'Login Error',
			reqs: {
				userName: userName,
				body: req.body
			}
		});
	}
  }, delay);
}

module.exports = {
	handleLoginRequest: handleLoginRequest
}