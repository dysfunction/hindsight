(function (window, document) {
	var game, keymap;

	function createCanvas(width, height, node) {
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		if (node && node.appendChild) {
			node.appendChild(canvas);
		}

		return canvas;
	}

	Date.now = Date.now || function () {
		return new Date().getTime();
	};

	function rand(min, max) {
		return min + Math.random() * (max - min);
	}

	/* Set up keymap */
	(function () {
		var key;
		keymap = {
			space: 32,
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};

		keymap.index = {};
		for (key in keymap) {
			if (keymap.hasOwnProperty(key)) {
				if (typeof keymap[key] === 'number') {
					keymap.index[keymap[key]] = 1;
				}
			}
		}
	}());

	function each(collection, callback) {
		var j, n = collection.length;

		for (j = 0; j < n; j += 1) {
			if (callback(collection[j], j) === false) {
				break;
			}
		}
	}

	function Starfield(width, height) {
		this.initStars(200, width, height);
	}
	Starfield.prototype.initStars = function (numStars, width, height) {
		var j;
		this.width = width;
		this.height = height;
		this.stars = [];

		for (j = 0; j < numStars; j += 1) {
			this.stars[j] = {
				x: rand(0, width),
				y: rand(0, height),
				size: Math.floor(rand(1, 3)),
				vx: 0,
				vy: rand(2, 10)
			};
		}
	};
	Starfield.prototype.update = function (delta) {
		var self = this;

		each(this.stars, function (star) {
			star.x += star.vx * delta * 0.01;
			star.y += star.vy * delta * 0.01;
			if (star.y >= self.height) {
				star.y %= self.height;
			}
		});
	};
	Starfield.prototype.render = function (ctx) {
		ctx.fillStyle = '#999';
		ctx.beginPath();

		each(this.stars, function (star) {
			ctx.rect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
		});

		ctx.fill();
	};

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

	function Bullet() {}
	Bullet.prototype = new Projectile();
	Bullet.prototype.isAlive = function () {
		return this.alive && this.ticks < 1000;
	};

	function LongRangeBullet() {}

	LongRangeBullet.prototype = new Bullet();
	LongRangeBullet.prototype.isAlive = function () {
		return this.alive && this.ticks < 10000;
	};

	function Laser() {}
	Laser.prototype = new LongRangeBullet();
	Laser.prototype.render = function (ctx) {
		ctx.fillStyle = '#0ff';
		ctx.fillRect(this.x, this.y, 1, 16);
	};

	function Ship() {}
	Ship.prototype.init = function (environment) {
		this.env = environment;
		this.width = 25;
		this.height = 25;
		this.x = (this.env.width / 2) - (this.width / 2);
		this.y = this.env.height - this.height - 25;
		this.vx = 2;
		this.vy = 1;
		this.ticks = 0;
	};
	Ship.prototype.moveLeft = function (delta) {
		this.x -= this.vx * delta * 0.1;
	};
	Ship.prototype.moveRight = function (delta) {
		this.x += this.vx * delta * 0.1;
	};
	Ship.prototype.moveUp = function (delta) {
	};
	Ship.prototype.moveDown = function (delta) {
	};
	Ship.prototype.fire = function () {
		return [
			new Bullet().init(this.x + this.width * 0.5, this.y, 0, -4)
		];
	};
	Ship.prototype.update = function (delta) {
		this.ticks += delta;

		if (this.env.keys[keymap.left]) {
			this.moveLeft(delta);
		}

		if (this.env.keys[keymap.right]) {
			this.moveRight(delta);
		}

		if (this.env.keys[keymap.up]) {
			this.moveUp(delta);
		}

		if (this.env.keys[keymap.down]) {
			this.moveDown(delta);
		}

		if (this.env.keys[keymap.space]) {
			this.env.keys[keymap.space] = 0;
			this.env.shipProjectiles = this.env.shipProjectiles.concat(this.fire());
		}
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

	function ThrusterShip() {}
	ThrusterShip.prototype = new Ship();
	ThrusterShip.prototype.moveUp = function (delta) {
		this.y -= this.vx * delta * 0.1;
	};
	ThrusterShip.prototype.moveDown = function (delta) {
		this.y += this.vx * delta * 0.1;
	};
	ThrusterShip.prototype.renderThrusters = function (ctx) {
		ctx.fillStyle = '#F34C22';
		ctx.beginPath();
		ctx.moveTo(this.x, this.y + this.height);
		ctx.lineTo(this.x + (this.width / 4), this.y + this.height + (this.height / 4));
		ctx.lineTo(this.x + (this.width / 2), this.y + this.height);
		ctx.lineTo(this.x + this.width - (this.width / 4), this.y + this.height + (this.height / 4));
		ctx.lineTo(this.x + this.width, this.y + this.height);
		ctx.fill();
	};

	function LongRangeShip() {}
	LongRangeShip.prototype = new ThrusterShip();
	LongRangeShip.prototype.fire = function () {
		return [
			new LongRangeBullet().init(this.x + this.width * 0.5, this.y, 0, -4)
		];
	};

	function LaserShip() {}
	LaserShip.prototype = new LongRangeShip();
	LaserShip.prototype.fire = function () {
		return [
			new Laser().init(this.x + this.width * 0.5, this.y, 0, -8)
		];
	};

	game = (function () {
		var width = 800,
			height = 600,
			starfield,
			ship,
			shipProjectiles = [],
			enemyProjectiles = [],
			keys = [];

		function init() {
			starfield = new Starfield(width, height);
			ship = new LaserShip();
			ship.init(this);
		}

		function loopProjectiles(projectiles, callback) {
			var dirty = false;
			each(projectiles, function (projectile) {
				callback.call(game, projectile);
				if (!projectile.isAlive()) {
					dirty = true;
				}
			});

			if (dirty) {
				return projectiles.filter(function (projectile) {
					return projectile.isAlive();
				});
			}

			return projectiles;
		}

		function updateProjectiles(delta) {
			this.shipProjectiles = loopProjectiles(this.shipProjectiles, function (projectile) {
				projectile.update(delta);
			});

			this.enemyProjectiles = loopProjectiles(this.enemyProjectiles, function (projectile) {
				projectile.update(delta);
			});
		}

		function renderProjectiles(ctx) {
			loopProjectiles(this.shipProjectiles, function (projectile) {
				projectile.render(ctx);
			});

			loopProjectiles(this.enemyProjectiles, function (projectile) {
				projectile.render(ctx);
			});
		}

		function update(delta) {
			starfield.update(delta);
			ship.update(delta);
			updateProjectiles.call(this, delta);
		}

		function keyDown(code, evt) {
			if (keymap.index[code]) {
				keys[code] = 1;
				evt.preventDefault();
				return false;
			}
		}

		function keyUp(code, evt) {
			keys[code] = 0;

			if (keymap.index[code]) {
				evt.preventDefault();
				return false;
			}
		}

		function render(ctx) {
			ctx.textAlign = 'center';
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, width, height);

			starfield.render(ctx);

			ctx.fillStyle = '#fff';
			ctx.font = '80px proggy';
			ctx.fillText('Hindsight', width / 2, 100);

			renderProjectiles.call(this, ctx);
			ship.render(ctx);
		}

		return ({
			width: width,
			height: height,
			init: init,
			update: update,
			render: render,
			keyDown: keyDown,
			keyUp: keyUp,
			keys: keys,
			shipProjectiles: shipProjectiles,
			enemyProjectiles: enemyProjectiles
		});
	}());

	(function () {
		var lastUpdate, repaint, canvas, ctx;
		lastUpdate = Date.now();
		repaint = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(function () {
					callback(Date.now());
				}, 20);
			};

		game.init.call(game);
		canvas = createCanvas(game.width, game.height, document.body);
		canvas.tabIndex = 0;
		canvas.focus();
		ctx = canvas.getContext('2d');

		canvas.addEventListener('keydown', function (e) {
			return game.keyDown.call(game, e.keyCode, e);
		}, false);

		canvas.addEventListener('keyup', function (e) {
			return game.keyUp.call(game, e.keyCode, e);
		}, false);

		(function loop(time) {
			game.update.call(game, time - lastUpdate);
			lastUpdate = time;
			game.render.call(game, ctx);
			repaint(loop);
		}(Date.now()));
	}());
}(this, this.document));
