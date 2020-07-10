new Vue({
	el: "#app", data() {
		return {
			value: "test", type: "input",
			showSwitch: false,
		};
	}, methods: {
		changeType(bool) {
			bool ? this.type = "select" : this.type = "input";
		}, changeSwitch(bool) {
			this.showSwitch = bool;
		},
	},
});
