(function () {
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

	function each(collection, callback) {
		var j, n = collection.length;

		for (j = 0;j < n; j += 1) {
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

		for (j = 0;j < numStars; j += 1) {
			this.stars[j] = {
				x: rand(0, width),
				y: rand(0, height),
				size: Math.floor(rand(1, 3)),
				vx: 0,
				vy: -rand(2, 10)
			};
		}
	};

	Starfield.prototype.update = function (delta) {
		var self = this;

		each(this.stars, function (star) {
			star.x += star.vx * delta * .01;
			star.y += star.vy * delta * .01;
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

	var game = (function () {
		var width = 800,
			height = 600,
			starfield,
			keys = [];

		function init() {
			starfield = new Starfield(width, height);
		}

		function update(delta) {
			starfield.update(delta);
		}

		function keyDown(code) {
			keys[code] = 1;
			return false;
		}

		function keyUp(code) {
			keys[code] = 0;
			return false;
		}

		function render(ctx) {
			ctx.textAlign = 'center';
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, width, height);

			starfield.render(ctx);

			ctx.fillStyle = '#fff';
			ctx.font = '80px proggy';
			ctx.fillText('Hindsight', width / 2, 100);
		}

		return ({
			width: width,
			height: height,
			init: init,
			update: update,
			render: render,
			keyDown: keyDown,
			keyUp: keyUp
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

		game.init();
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
			game.update(lastUpdate - time);
			lastUpdate = time;
			game.render(ctx);
			repaint(loop);
		}(Date.now()));
	}());
}());
