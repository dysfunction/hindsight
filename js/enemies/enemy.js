define(['rect'], function (Rect) {
	function Enemy() {}

	Enemy.prototype.init = function (environment, x, y, vx, vy) {
		this.env = environment;
		this.bounds = new Rect(x, y, 10, 10);
		this.vx = vx;
		this.vy = vy;
		this.ticks = 0;

		return this;
	}

	Enemy.prototype.getShot = function () {
		return [];
	};

	Enemy.prototype.fire = function () {
		this.env.enemyProjectiles = this.env.enemyProjectiles.concat(this.getShot());
	};

	Enemy.prototype.update = function (delta) {
		this.ticks += delta;

		this.bounds.x += this.vx;
		this.bounds.y += this.vy;
	};

	Enemy.prototype.render = function (ctx) {
		ctx.fillStyle = '#f00';
		ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
	};

	return Enemy;
});
