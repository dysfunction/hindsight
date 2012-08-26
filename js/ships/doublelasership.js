define(['ships/lasership', 'weapons/laser'], function (LaserShip, Laser) {

	function DoubleLaserShip() {}

	DoubleLaserShip.prototype = new LaserShip();

	DoubleLaserShip.prototype.init = function (environment) {
		LaserShip.prototype.init.call(this, environment);
		this.bounds.width = 35;
	};

	DoubleLaserShip.prototype.getShot = function () {
		return [
			new Laser().init(this.bounds.x + this.bounds.width * 0.5 - 9, this.bounds.y, 0, -8),
			new Laser().init(this.bounds.x + this.bounds.width * 0.5 + 8, this.bounds.y, 0, -8)
		];
	};

	DoubleLaserShip.prototype.renderBody = function (ctx) {
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.moveTo(this.bounds.x, this.bounds.y + this.bounds.height);
		ctx.lineTo(this.bounds.x + (this.bounds.width / 4), this.bounds.y);
		ctx.lineTo(this.bounds.x + (this.bounds.width / 2), this.bounds.y + 10);
		ctx.lineTo(this.bounds.x + this.bounds.width - (this.bounds.width / 4), this.bounds.y);
		ctx.lineTo(this.bounds.x + this.bounds.width, this.bounds.y + this.bounds.height);
		ctx.fill();
	};

	return DoubleLaserShip;
});
