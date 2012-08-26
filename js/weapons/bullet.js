define(['weapons/projectile'], function (Projectile) {
	function Bullet() {}

	Bullet.prototype = new Projectile();

	Bullet.prototype.isAlive = function () {
		return this.alive && this.ticks < 1500;
	};

	Bullet.prototype.render = function (ctx) {
		ctx.fillStyle = '#ff0';
		ctx.fillRect(this.x, this.y, 2, 2);
	};

	return Bullet;
});
