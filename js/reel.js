
function Dancer(sectionIndex, colour, speeds, who) {
	this._speeds = speeds;
	this._colour = colour;
	this._twoBars = 0;
	this._who = who;
	this.radius = 100.0;
	this.cx = 140;
	this.cy = 130;
	
	this._sections = [
		{angle: Math.PI, stepSign: 1, centreIndex: 0},
		{angle: Math.PI, stepSign: -1, centreIndex: 1},
		{angle: 0.0, stepSign: -1, centreIndex: 1},
		{angle: 0.0, stepSign: 1, centreIndex: 0}
	];

	/* Move onto a specific section. */
	this.place = function(sectionIndex) {
		this._sectionIndex = sectionIndex;
		var section = this._sections[sectionIndex];
		this._angle = section.angle;
		this._maxCount = this._speeds[this._twoBars];
		this._step = section.stepSign * Math.PI / this._maxCount;
		this._count = 0;
		this._centreIndex = section.centreIndex;
	};
		
	this.calcPosition = function() {
		var x = this.cx + 2.0 * this.radius * this._centreIndex + this.radius * Math.cos(this._angle);
		var y = this.cy + this.radius * Math.sin(this._angle);
		this._position = {x: x, y: y};	
	};
	
	this.getPosition = function() {
		return this._position;
	};
	
	this.updatePosition = function() {
		this._count += 1;
		this._angle += this._step;
		if (this._count === this._maxCount) {
			this._twoBars += 1;
			if (this._sectionIndex === 3) {
				this.place(0);
			} else {
				this.place(this._sectionIndex + 1);
			}
		}
	};
	
	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this._colour;
		ctx.strokeStyle = this._colour;
		ctx.arc(this._position.x, this._position.y, 20, 0.0, 2.0 * Math.PI);
		ctx.fill();
		ctx.stroke();
		
		ctx.font = '30px serif';
		ctx.fillStyle = "white";	
		ctx.fillText((this._who + 1), this._position.x - 8, this._position.y + 10); 
	};
	
	this.place(sectionIndex);
};


var reel = {
	_path: [],
	_dancers: [],
	_counts: [],
	_timeCount: 0,
	_whoToPlot: 0,
	_endCallback: null,
	
	init: function(counts, whoToPlot) {
		this._path = [];
		this._dancers = [];
		this._counts = counts;
		this._timeCount = 0;
		this._whoToPlot = whoToPlot;
		
		var colours = [
			"#e00000",
			"#00e000",
			"#0000e0"];
		
		this._makeDancer(0, colours[0], [1, 1, 1, 1], 0);
		this._makeDancer(3, colours[1], [1, 1, 1, 1], 1);
		this._makeDancer(2, colours[2], [0, 2, 0, 2], 2);
	},
	
	setEndCallback: function(endCallback) {
		this._endCallback = endCallback;
	},
	
	getFullReelCount: function() {
		return this._counts[1];
	},
	
	_makeDancer: function(section, colour, countIndexes, who) {
		var counts = [];
		countIndexes.forEach(function(countIndex) {
			counts.push(reel._counts[countIndex]);
		});
		this._dancers.push(new Dancer(section, colour, counts, who));
	},
	
	calcAndMove: function() {
		this._dancers.forEach(function(dancer) {
			dancer.calcPosition();
			dancer.updatePosition();
		});
		this._path.push(this._dancers[this._whoToPlot].getPosition());
	},
	
	_draw: function() {
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this._drawPath(ctx, this._path);
		this._dancers.forEach(function(dancer) {
			dancer.draw(ctx);
		});

	},
	
	_drawPath: function(ctx, path) {
		ctx.fillStyle = '#a0a0a0';
		ctx.strokeStyle = '#a0a0a0';
		path.forEach(function(xy) {
			ctx.beginPath();
			ctx.arc(xy.x, xy.y, 3, 0.0, 2.0 * Math.PI);
			ctx.fill();
			ctx.stroke();
		});	
	},
	
	_doFrame: function() {
		this.calcAndMove();
		this._draw();	
		this._timeCount += 1;
		if (this._timeCount <= this._endTimeCount) {
			window.requestAnimationFrame(function() {
				reel._doFrame();
			});
		} else {
			this._endCallback();
		}
	},
	
	startFrom: function(timeCount, places) {
		for(var i = 0; i< places.length; i++) {
			this._dancers[i].place(places[i]);
		}
		this._timeCount = timeCount;
	},
	render: function() {
		this._dancers.forEach(function(dancer) {
			dancer.calcPosition();
		});
		this._draw();
	},
	animate: function(endTimeCount) {
		this._endTimeCount = endTimeCount;
		window.requestAnimationFrame(function() {
			reel._doFrame();
		});
	}
};

