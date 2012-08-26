define(function () {
	return {
		rand: function (min, max) {
			return min + Math.random() * (max - min);
		},

		each: function(collection, callback) {
			var j, n = collection.length;

			for (j = 0; j < n; j += 1) {
				if (callback(collection[j], j) === false) {
					break;
				}
			}
		}
	};
});

