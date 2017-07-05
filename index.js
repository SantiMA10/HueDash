/**
 * Created by Santiago M.A. on 05/07/2017.
 */
require('dotenv').config();
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
	state = hue.lightState.create(),
	target = process.env.TARGET_ID,
	api = new HueApi(process.env.HOST, process.env.HUE_USER);

var dash_button = require('node-dash-button'),
	dash = dash_button(process.env.DASH_BUTTON, null, null, 'all');

dash.on('detected', function () {
	api.lightStatus(target)
		.then(function (res) {
			if(res.state.on){
				api.setLightState(target, state.off());
			}
			else{
				api.setLightState(target, state.on());
			}
		})
		.done();
});