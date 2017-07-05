/**
 * Created by Santiago M.A. on 05/07/2017.
 */
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
	state = hue.lightState.create(),
	target = process.env.TARGET_ID,
	config = require(__dirname + "/config"),
	api = new HueApi(config.host, config.hue_user);



var dash_button = require('node-dash-button');

config.configs.forEach(function (config) {
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


