define(['ships/doublelasership'], function (DoubleLaserShip) {

	function AgileShip() {}

	AgileShip.prototype = new DoubleLaserShip();

	AgileShip.prototype.moveLeft = function (delta) {
		this.x -= this.vx * delta * 0.15;

		if (this.x < -this.width) {
			this.x += this.env.width + this.width;
		}
	};

	AgileShip.prototype.moveRight = function (delta) {
		this.x += this.vx * delta * 0.15;
		this.x %= this.env.width;
	};

	AgileShip.prototype.moveUp = function (delta) {
		this.y -= this.vy * delta * 0.2;

		if (this.y < -this.height) {
			this.y += this.env.height + this.height;
		}
	};

	AgileShip.prototype.moveDown = function (delta) {
		this.y += this.vy * delta * 0.2;
		this.y %= this.env.height;
	};

	return AgileShip;
});
