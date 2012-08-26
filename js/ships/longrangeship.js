define(['ships/thrustership'], function (ThrusterShip) {

	function LongRangeShip() {}

	LongRangeShip.prototype = new ThrusterShip();

	LongRangeShip.prototype.getShot = function () {
		return [
			new LongRangeBullet().init(this.bounds.x + this.bounds.width * 0.5, this.bounds.y, 0, -4)
		];
	};

	return LongRangeShip;
});
