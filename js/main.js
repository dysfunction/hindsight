require(['game'], function (game) {
	var lastUpdate, repaint, canvas, ctx;

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
});
