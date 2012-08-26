define(['ships/longrangeship', 'weapons/laser'], function (LongRangeShip, Laser) {

	function LaserShip() {}

	LaserShip.prototype = new LongRangeShip();

	LaserShip.prototype.getShot = function () {
		return [
			new Laser().init(this.x + this.width * 0.5, this.y, 0, -8)
		];
	};

	return LaserShip;
});
