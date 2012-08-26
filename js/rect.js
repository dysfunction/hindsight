define(function () {
	function Rect(x, y, width,height) {
		this.x = +x || 0;
		this.y = +y || 0;
		this.width = +width || 1;
		this.height = +height || 1;
	}

	Rect.prototype.contains = function (x, y) {
		return (
			(x >= this.x && x <= this.x + this.width) &&
			(y >= this.y && y <= this.y + this.height)
		);
	};

	/* modified from the java.awt.Rect source code */
	Rect.prototype.intersects = function (rect) {
		var tw, th, rw, rh, tx, ty, rx, ry;

		tw = this.width;
		th = this.height;
		rw = rect.width;
		rh = rect.height;
		if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
			return false;
		}
		tx = this.x;
		ty = this.y;
		rx = rect.x;
		ry = rect.y;
		rw += rx;
		rh += ry;
		tw += tx;
		th += ty;
		//      overflow || intersect
		return ((rw < rx || rw > tx) &&
			(rh < ry || rh > ty) &&
			(tw < tx || tw > rx) &&
			(th < ty || th > ry));
	};

	return Rect;
});
