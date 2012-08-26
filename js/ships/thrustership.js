define(['ships/ship'], function (Ship) {
	function ThrusterShip() {}

	ThrusterShip.prototype = new Ship();

	ThrusterShip.prototype.moveUp = function (delta) {
		this.bounds.y -= this.vx * delta * 0.1;
		this.bounds.y = Math.max(this.bounds.y, this.env.height - 200);
	};

	ThrusterShip.prototype.moveDown = function (delta) {
		this.bounds.y += this.vx * delta * 0.1;

		if (this.bounds.y >= this.env.height - this.bounds.height - 30) {
			this.bounds.y = this.env.height - this.bounds.height - 30;
		}
	};

	ThrusterShip.prototype.renderThrusters = function (ctx) {
		ctx.fillStyle = '#F34C22';
		ctx.beginPath();
		ctx.moveTo(this.bounds.x, this.bounds.y + this.bounds.height);
		ctx.lineTo(this.bounds.x + (this.bounds.width / 4), this.bounds.y + this.bounds.height + (this.bounds.height / 4));
		ctx.lineTo(this.bounds.x + (this.bounds.width / 2), this.bounds.y + this.bounds.height);
		ctx.lineTo(this.bounds.x + this.bounds.width - (this.bounds.width / 4), this.bounds.y + this.bounds.height + (this.bounds.height / 4));
		ctx.lineTo(this.bounds.x + this.bounds.width, this.bounds.y + this.bounds.height);
		ctx.fill();
	};

	return ThrusterShip;
});
