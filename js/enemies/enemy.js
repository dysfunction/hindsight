define(function () {
	function Enemy() {}

	Enemy.prototype.init = function (environment, x, y, vx, vy) {
		this.env = environment;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.width = 10;
		this.height = 10;
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

		this.x += this.vx;
		this.y += this.vy;
	};

	Enemy.prototype.render = function (ctx) {
		ctx.fillStyle = '#f00';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	return Enemy;
});
