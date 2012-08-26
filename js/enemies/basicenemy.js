define(['enemies/enemy', 'weapons/laser'], function (Enemy, Laser) {
	function BasicEnemy() {}

	BasicEnemy.prototype = new Enemy();

	BasicEnemy.prototype.update = function (delta) {
		Enemy.prototype.update.call(this, delta);

		if (this.ticks >= 500) {
			this.fire();
			this.ticks %= 500;
		}
	};

	BasicEnemy.prototype.getShot = function () {
		return [
			new Laser().init(this.x + this.width * 0.5, this.y, 0, 8)
		];
	};

	return BasicEnemy;
});
