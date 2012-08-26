define(['input', 'rect', 'weapons/bullet'], function (input, Rect, Bullet) {
	function Ship() {}

	Ship.prototype.init = function (environment) {
		this.env = environment;
		this.bounds = new Rect();
		this.bounds.width = 25;
		this.bounds.height = 25;
		this.bounds.x = (this.env.width / 2) - (this.bounds.width / 2);
		this.bounds.y = this.env.height - this.bounds.height - 30;
		this.vx = 2;
		this.vy = 1;
		this.ticks = 0;
	};

	Ship.prototype.moveLeft = function (delta) {
		this.bounds.x -= this.vx * delta * 0.1;
		this.bounds.x = Math.max(0, this.bounds.x);
	};

	Ship.prototype.moveRight = function (delta) {
		this.bounds.x += this.vx * delta * 0.1;
		this.bounds.x = Math.min(this.bounds.x, this.env.width - this.bounds.width);
	};

	Ship.prototype.moveUp = function (delta) {
	};

	Ship.prototype.moveDown = function (delta) {
	};

	Ship.prototype.getShot = function () {
		return [
			new Bullet().init(this.bounds.x + this.bounds.width * 0.5, this.bounds.y, 0, -4)
		];
	};

	Ship.prototype.fire = function () {
		this.env.shipProjectiles = this.env.shipProjectiles.concat(this.getShot());
	};

	Ship.prototype.checkFireKey = function () {
		if (this.env.isKeyDown(input.keymap.space)) {
			this.env.keys[input.keymap.space] = -1;
			this.fire();
		}
	};

	Ship.prototype.update = function (delta) {
		this.ticks += delta;

		if (this.env.isKeyDown(input.keymap.left)) {
			this.moveLeft(delta);
		}

		if (this.env.isKeyDown(input.keymap.right)) {
			this.moveRight(delta);
		}

		if (this.env.isKeyDown(input.keymap.up)) {
			this.moveUp(delta);
		}

		if (this.env.isKeyDown(input.keymap.down)) {
			this.moveDown(delta);
		}

		this.checkFireKey();
	};

	Ship.prototype.renderBody = function (ctx) {
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.moveTo(this.bounds.x, this.bounds.y + this.bounds.height);
		ctx.lineTo(this.bounds.x + (this.bounds.width / 2), this.bounds.y);
		ctx.lineTo(this.bounds.x + this.bounds.width, this.bounds.y + this.bounds.height);
		ctx.fill();
	};

	Ship.prototype.renderThrusters = function (ctx) {
		ctx.fillStyle = '#F34C22';
		ctx.beginPath();
		ctx.moveTo(this.bounds.x + (this.bounds.width / 4), this.bounds.y + this.bounds.height);
		ctx.lineTo(this.bounds.x + (this.bounds.width / 2), this.bounds.y + this.bounds.height + (this.bounds.height / 4));
		ctx.lineTo(this.bounds.x + this.bounds.width - (this.bounds.width / 4), this.bounds.y + this.bounds.height);
		ctx.fill();
	};

	Ship.prototype.render = function (ctx) {
		this.renderBody(ctx);

		if ((this.ticks % 80) <= 40) {
			this.renderThrusters(ctx);
		}
	};

	return Ship;
});
