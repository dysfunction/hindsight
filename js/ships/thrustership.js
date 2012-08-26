define(['ships/ship'], function (Ship) {
	function ThrusterShip() {}

	ThrusterShip.prototype = new Ship();

	ThrusterShip.prototype.moveUp = function (delta) {
		this.y -= this.vx * delta * 0.1;
		this.y = Math.max(this.y, this.env.height - 200);
	};

	ThrusterShip.prototype.moveDown = function (delta) {
		this.y += this.vx * delta * 0.1;

		if (this.y >= this.env.height - this.height - 10) {
			this.y = this.env.height - this.height - 10;
		}
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

	return ThrusterShip;
});
