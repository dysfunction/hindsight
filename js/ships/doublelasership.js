define(['ships/lasership', 'weapons/laser'], function (LaserShip, Laser) {

	function DoubleLaserShip() {}

	DoubleLaserShip.prototype = new LaserShip();

	DoubleLaserShip.prototype.init = function (environment) {
		LaserShip.prototype.init.call(this, environment);
		this.width = 35;
	};

	DoubleLaserShip.prototype.getShot = function () {
		return [
			new Laser().init(this.x + this.width * 0.5 - 9, this.y, 0, -8),
			new Laser().init(this.x + this.width * 0.5 + 8, this.y, 0, -8)
		];
	};

	DoubleLaserShip.prototype.renderBody = function (ctx) {
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.moveTo(this.x, this.y + this.height);
		ctx.lineTo(this.x + (this.width / 4), this.y);
		ctx.lineTo(this.x + (this.width / 2), this.y + 10);
		ctx.lineTo(this.x + this.width - (this.width / 4), this.y);
		ctx.lineTo(this.x + this.width, this.y + this.height);
		ctx.fill();
	};

	return DoubleLaserShip;
});
