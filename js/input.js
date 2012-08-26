define(function () {
	var key, keymap = {
		space: 32,
		left: 37,
		up: 38,
		right: 39,
		down: 40,
		q: 81
	};

	keymap.index = {};

	for (key in keymap) {
		if (keymap.hasOwnProperty(key)) {
			if (typeof keymap[key] === 'number') {
				keymap.index[keymap[key]] = 1;
			}
		}
	}

	return {
		keymap: keymap
	};
});
