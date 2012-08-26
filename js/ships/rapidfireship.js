define(['ships/agileship', 'input'], function (AgileShip, input) {
	function RapidFireShip() {
		this.fireDelay = 0;
	}

	RapidFireShip.prototype = new AgileShip();

	RapidFireShip.prototype.update = function (delta) {
		AgileShip.prototype.update.call(this, delta);
		this.fireDelay += delta;
	};

	RapidFireShip.prototype.checkFireKey = function () {
		if (this.env.isKeyDown(input.keymap.space)) {
			if (this.fireDelay >= 50) {
				this.fire();
				this.fireDelay = 0;
			}
		}
	};

	return RapidFireShip;
});
