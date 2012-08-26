define(['weapons/bullet'], function (Bullet) {
	function LongRangeBullet() {}

	LongRangeBullet.prototype = new Bullet();

	LongRangeBullet.prototype.isAlive = function () {
		return this.alive && this.ticks < 10000;
	};

	return LongRangeBullet;
});

