define([
	'util',
	'input',
	'starfield',
	'ships/ship',
	'ships/thrustership',
	'ships/lasership',
	'ships/doublelasership',
	'ships/agileship',
	'ships/rapidfireship'
], function (
	util,
	input,
	Starfield,
	Ship,
	ThrusterShip,
	LaserShip,
	DoubleLaserShip,
	AgileShip,
	RapidFireShip
) {
	var width = 800,
		height = 600,
		starfield,
		ship,
		shipProjectiles = [],
		enemyProjectiles = [],
		ships = [],
		keys = [];

	function nextShip() {
		var ship;
		if (ships.length === 1) {
			ship =  new (ships[0])();
		} else {
			ship = new (ships.shift())();
		}

		ship.init(this);
		return ship;
	}

	function init() {
		starfield = new Starfield(width, height);
		ships = [
			Ship,
			ThrusterShip,
			LaserShip,
			DoubleLaserShip,
			AgileShip,
			RapidFireShip
		];
		ship = nextShip.call(this);
	}

	function isKeyDown(code) {
		return (keys[code] && keys[code] > 0);
	}

	function loopProjectiles(projectiles, callback) {
		var dirty = false;

		util.each(projectiles, function (projectile) {
			callback.call(this, projectile);
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

		this.enemyProjectiles = loopProjectiles(this, this.enemyProjectiles, function (projectile) {
			projectile.update(delta);
		});
	}

	function renderProjectiles(ctx) {
		loopProjectiles.call(this, this.shipProjectiles, function (projectile) {
			projectile.render(ctx);
		});

		loopProjectiles(this.enemyProjectiles, function (projectile) {
			projectile.render(ctx);
		});
	}

	function update(delta) {
		if (isKeyDown(input.keymap.q)) {
			keys[input.keymap.q] = -1;
			ship = nextShip.call(this);
		}

		starfield.update(delta);
		ship.update(delta);
		updateProjectiles.call(this, delta);
	}

	function keyDown(code, evt) {
		if (input.keymap.index[code]) {
			if (keys[code] !== -1) {
				keys[code] = 1;
			}

			evt.preventDefault();
			return false;
		}
	}

	function keyUp(code, evt) {
		keys[code] = 0;

		if (input.keymap.index[code]) {
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
		isKeyDown: isKeyDown,
		shipProjectiles: shipProjectiles,
		enemyProjectiles: enemyProjectiles
	});
});
