define(['input', 'weapons/bullet'], function (input, Bullet) {
	function Ship() {}

	Ship.prototype.init = function (environment) {
		this.env = environment;
		this.width = 25;
		this.height = 25;
		this.x = (this.env.width / 2) - (this.width / 2);
		this.y = this.env.height - this.height - 30;
		this.vx = 2;
		this.vy = 1;
		this.ticks = 0;
	};

	Ship.prototype.moveLeft = function (delta) {
		this.x -= this.vx * delta * 0.1;
		this.x = Math.max(0, this.x);
	};

	Ship.prototype.moveRight = function (delta) {
		this.x += this.vx * delta * 0.1;
		this.x = Math.min(this.x, this.env.width - this.width);
	};

	Ship.prototype.moveUp = function (delta) {
	};

	Ship.prototype.moveDown = function (delta) {
	};

	Ship.prototype.getShot = function () {
		return [
			new Bullet().init(this.x + this.width * 0.5, this.y, 0, -4)
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
		ctx.moveTo(this.x, this.y + this.height);
		ctx.lineTo(this.x + (this.width / 2), this.y);
		ctx.lineTo(this.x + this.width, this.y + this.height);
		ctx.fill();
	};

	Ship.prototype.renderThrusters = function (ctx) {
		ctx.fillStyle = '#F34C22';
		ctx.beginPath();
		ctx.moveTo(this.x + (this.width / 4), this.y + this.height);
		ctx.lineTo(this.x + (this.width / 2), this.y + this.height + (this.height / 4));
		ctx.lineTo(this.x + this.width - (this.width / 4), this.y + this.height);
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
