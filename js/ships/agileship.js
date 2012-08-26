define(['ships/doublelasership'], function (DoubleLaserShip) {

	function AgileShip() {}

	AgileShip.prototype = new DoubleLaserShip();

	AgileShip.prototype.moveLeft = function (delta) {
		this.bounds.x -= this.vx * delta * 0.15;

		if (this.bounds.x < -this.bounds.width) {
			this.bounds.x += this.env.width + this.bounds.width;
		}
	};

	AgileShip.prototype.moveRight = function (delta) {
		this.bounds.x += this.vx * delta * 0.15;
		this.bounds.x %= this.env.width;
	};

	AgileShip.prototype.moveUp = function (delta) {
		this.bounds.y -= this.vy * delta * 0.2;

		if (this.bounds.y < -this.bounds.height) {
			this.bounds.y += this.env.height + this.bounds.height;
		}
	};

	AgileShip.prototype.moveDown = function (delta) {
		this.bounds.y += this.vy * delta * 0.2;
		this.bounds.y %= this.env.height;
	};

	return AgileShip;
});
