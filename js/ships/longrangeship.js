define(['ships/thrustership'], function (ThrusterShip) {

	function LongRangeShip() {}

	LongRangeShip.prototype = new ThrusterShip();

	LongRangeShip.prototype.getShot = function () {
		return [
			new LongRangeBullet().init(this.x + this.width * 0.5, this.y, 0, -4)
		];
	};

	return LongRangeShip;
});
