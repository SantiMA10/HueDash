var HueApi = require("node-hue-api").HueApi;

var host = process.env.HOST,
	userDescription = "device description goes here";

var displayUserResult = function(result) {
	console.log("Created user: " + JSON.stringify(result));
};

var displayError = function(err) {
	console.log(err);
};

var hue = new HueApi();

// --------------------------
// Using a promise
hue.registerUser(host, userDescription)
	.then(displayUserResult)
	.fail(displayError)
	.done();