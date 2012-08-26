define(['util'], function (util) {
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
				x: util.rand(0, width),
				y: util.rand(0, height),
				size: Math.floor(util.rand(1, 3)),
				vx: 0,
				vy: util.rand(2, 10)
			};
		}
	};

	Starfield.prototype.update = function (delta) {
		var self = this;

		util.each(this.stars, function (star) {
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

		util.each(this.stars, function (star) {
			ctx.rect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
		});

		ctx.fill();
	};

	return Starfield;
});
