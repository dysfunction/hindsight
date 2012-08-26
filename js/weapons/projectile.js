define(function () {
	function Projectile() {}
	Projectile.prototype.init = function (x, y, vx, vy) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.ticks = 0;
		this.alive = true;

		return this;
	};
	Projectile.prototype.update = function (delta) {
		this.ticks += delta;
		this.x += this.vx;
		this.y += this.vy;
	};
	Projectile.prototype.isAlive = function () {
		return this.alive;
	};
	Projectile.prototype.render = function (ctx) {
		ctx.fillStyle = '#fff';
		ctx.fillRect(this.x, this.y, 2, 2);
	};

	return Projectile;
});
