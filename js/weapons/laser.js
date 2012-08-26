define(['weapons/longrangebullet'], function (LongRangeBullet) {
	function Laser() {}

	Laser.prototype = new LongRangeBullet();

	Laser.prototype.init = function (x, y, vx, vy) {
		LongRangeBullet.prototype.init.call(this, x, y, vx, vy);
		this.bounds.height = 16;

		return this;
	}

	Laser.prototype.render = function (ctx) {
		ctx.fillStyle = '#0ff';
		ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
	};

	return Laser;
});
