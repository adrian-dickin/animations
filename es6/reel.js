
class ReelDancer {
	constructor(colour, speeds, who) {
		this._speeds = speeds;
		this._colour = colour;
		this._twoBars = 0;   // half a circle
		this._who = who;
		this.radius = 100.0;
		this.cx = 140;
		this.cy = 130;
	}

	/* Move onto a specific section. */
	place(sectionIndex) {
		this._sectionIndex = sectionIndex;
		this._section = this._sections[sectionIndex];
		this._angle = this._section.angle;
		this._maxCount = this._speeds[this._twoBars];
		if (this._section.fromCentre) {
			this._offsetX = 0;
			this._offsetY = 0;
			this._stepX = - 2.0 * this.radius / this._maxCount;
			this._stepY = - this.radius / this._maxCount;
		} else {
			this._step = this._section.stepSign * Math.PI / this._maxCount;
		}
		this._count = 0;
	}

	/* Generate x/y position. */
	calcPosition() {
		if (this._section.fromCentre) {
			this._position = {x: this.cx + this.radius + this._offsetX, y: this.cy + this.radius + this._offsetY};
		} else {
			let x = this.cx + 2.0 * this.radius * this._section.centreIndex + this.radius * Math.cos(this._angle);
			let y = this.cy + this.radius * Math.sin(this._angle);
			this._position = {x, y};
		}
	}

	get position() {
		return this._position;
	}

	updatePosition() {
		let next = [1,2,3,0,0];
		this._count += 1;
		if (this._section.fromCentre) {
			this._offsetX = this._stepX * this._count;
			this._offsetY = this._stepY * this._count;
		} else {
			this._angle += this._step;
		}
		if (this._count === this._maxCount) {
			this._twoBars += 1;
			this.place(next[this._sectionIndex]);
		}
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this._colour;
		ctx.strokeStyle = this._colour;
		ctx.arc(this._position.x, this._position.y, 20, 0.0, 2.0 * Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.font = '30px serif';
		ctx.fillStyle = "white";
		ctx.fillText((this._who + 1), this._position.x - 8, this._position.y + 10);
	}
};

class RshReelDancer extends ReelDancer {
	constructor(sectionIndex, colour, speeds, who) {
		super(colour, speeds, who);
		this._sections = [
			{angle: Math.PI, stepSign: 1, centreIndex: 0},
			{angle: Math.PI, stepSign: -1, centreIndex: 1},
			{angle: 0.0, stepSign: -1, centreIndex: 1},
			{angle: 0.0, stepSign: 1, centreIndex: 0},
			{fromCentre: true}
		];
		this.place(sectionIndex);
	}
};

class Reel {
	constructor(counts, whoToPlot) {
		this._path=  [];
		this._dancers = [];
		this._counts = counts;
		this._timeCount = 0;
		this._whoToPlot = whoToPlot;
		this._endCallback = null;

		const red = "#e00000";
		const green = "#00e000";
		const blue = "#0000e0";

		this._makeDancer(0, red, [1, 1, 1, 1], 0);
		this._makeDancer(3, green, [1, 1, 1, 1], 1);
		this._makeDancer(2, blue, [0, 2, 0, 2], 2);
	}

	_makeDancer(section, colour, countIndexes, who) {
		let counts = countIndexes.map(countIndex => this._counts[countIndex]);
		this._dancers.push(new RshReelDancer(section, colour, counts, who));
	}

	calcAndMove() {
		this._dancers.forEach(function(dancer) {
			dancer.calcPosition();
			dancer.updatePosition();
		});
		this._path.push(this._dancers[this._whoToPlot].position);
	}

	_draw() {
		let canvas = document.getElementById('canvas');
		let ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this._drawPath(ctx, this._path);
		this._dancers.forEach(dancer => dancer.draw(ctx));
	}

	_drawPath(ctx, path) {
		ctx.fillStyle = '#a0a0a0';
		ctx.strokeStyle = '#a0a0a0';
		path.forEach(xy => {
			ctx.beginPath();
			ctx.arc(xy.x, xy.y, 3, 0.0, 2.0 * Math.PI);
			ctx.fill();
			ctx.stroke();
		});
	}

	_doFrame() {
	    var that = this;
		this.calcAndMove();
		this._draw();
		this._timeCount += 1;
		if (this._timeCount <= this._endTimeCount) {
            window.requestAnimationFrame(function() {that._doFrame(); });
		} else {
			this._endCallback();
		}
	}

	startFrom(timeCount, places) {
		for(var i = 0; i< places.length; i++) {
			this._dancers[i].place(places[i]);
		}
		this._timeCount = timeCount;
	}
	render() {
		this._dancers.forEach(function(dancer) {
			dancer.calcPosition();
		});
		this._draw();
	}
	animate(endTimeCount) {
		var that = this;
		this._endTimeCount = endTimeCount;
        window.requestAnimationFrame( function() { that._doFrame(); } );
	}

	setEndCallback(endCallback) {
		this._endCallback = endCallback;
	}
};
