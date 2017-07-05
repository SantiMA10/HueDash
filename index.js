/**
 * Created by Santiago M.A. on 05/07/2017.
 */
require('dotenv').config();
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
	state = hue.lightState.create(),
	target = process.env.TARGET_ID,
	api = new HueApi(process.env.HOST, process.env.HUE_USER);

var dash_button = require('node-dash-button');

var configs = require(__dirname + "/config");

configs.forEach(function (config) {
	dash_button(config.mac, null, null, 'all')
		.on('detected', function () {
			api.lightStatus(config.light_id)
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
});
