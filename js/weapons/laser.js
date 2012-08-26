define(['weapons/longrangebullet'], function (LongRangeBullet) {
	function Laser() {}

	Laser.prototype = new LongRangeBullet();

	Laser.prototype.render = function (ctx) {
		ctx.fillStyle = '#0ff';
		ctx.fillRect(this.x, this.y, 2, 16);
	};

	return Laser;
});
