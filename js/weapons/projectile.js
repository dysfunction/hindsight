define(['rect'], function (Rect) {
	function Projectile() {}

	Projectile.prototype.init = function (x, y, vx, vy) {
		this.bounds = new Rect(x, y, 2, 2);
		this.vx = vx;
		this.vy = vy;
		this.ticks = 0;
		this.alive = true;

		return this;
	};

	Projectile.prototype.update = function (delta) {
		this.ticks += delta;
		this.bounds.x += this.vx;
		this.bounds.y += this.vy;
	};

	Projectile.prototype.isAlive = function () {
		return this.alive;
	};

	Projectile.prototype.render = function (ctx) {
		ctx.fillStyle = '#fff';
		ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
	};

	return Projectile;
});
