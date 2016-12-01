'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReelDancer = function () {
	function ReelDancer(colour, speeds, who) {
		_classCallCheck(this, ReelDancer);

		this._speeds = speeds;
		this._colour = colour;
		this._twoBars = 0;
		this._who = who;
		this.radius = 100.0;
		this.cx = 140;
		this.cy = 130;
	}

	/* Move onto a specific section. */


	_createClass(ReelDancer, [{
		key: 'place',
		value: function place(sectionIndex) {
			console.log('PLACE');
			this._sectionIndex = sectionIndex;
			var section = this._sections[sectionIndex];
			this._angle = section.angle;
			this._maxCount = this._speeds[this._twoBars];
			this._step = section.stepSign * Math.PI / this._maxCount;
			this._count = 0;
			this._centreIndex = section.centreIndex;
		}
	}, {
		key: 'calcPosition',
		value: function calcPosition() {
			var x = this.cx + 2.0 * this.radius * this._centreIndex + this.radius * Math.cos(this._angle);
			var y = this.cy + this.radius * Math.sin(this._angle);
			console.log(x);
			console.log(this.cx + ' ' + this.radius + ' ' + this._centreIndex);
			this._position = { x: x, y: y };
		}
	}, {
		key: 'updatePosition',
		value: function updatePosition() {
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
		}
	}, {
		key: 'draw',
		value: function draw(ctx) {
			ctx.beginPath();
			ctx.fillStyle = this._colour;
			ctx.strokeStyle = this._colour;
			ctx.arc(this._position.x, this._position.y, 20, 0.0, 2.0 * Math.PI);
			ctx.fill();
			ctx.stroke();
			console.log(this);
			ctx.font = '30px serif';
			ctx.fillStyle = "white";
			ctx.fillText(this._who + 1, this._position.x - 8, this._position.y + 10);
		}
	}, {
		key: 'position',
		get: function get() {
			return this._position;
		}
	}]);

	return ReelDancer;
}();

;

var RshReelDancer = function (_ReelDancer) {
	_inherits(RshReelDancer, _ReelDancer);

	function RshReelDancer(sectionIndex, colour, speeds, who) {
		_classCallCheck(this, RshReelDancer);

		var _this = _possibleConstructorReturn(this, (RshReelDancer.__proto__ || Object.getPrototypeOf(RshReelDancer)).call(this, colour, speeds, who));

		_this._sections = [{ angle: Math.PI, stepSign: 1, centreIndex: 0 }, { angle: Math.PI, stepSign: -1, centreIndex: 1 }, { angle: 0.0, stepSign: -1, centreIndex: 1 }, { angle: 0.0, stepSign: 1, centreIndex: 0 }];
		_this.place(sectionIndex);
		return _this;
	}

	return RshReelDancer;
}(ReelDancer);

;

var Reel = function () {
	function Reel(counts, whoToPlot) {
		_classCallCheck(this, Reel);

		this._path = [];
		this._dancers = [];
		this._counts = counts;
		this._timeCount = 0;
		this._whoToPlot = whoToPlot;
		this._endCallback = null;

		var red = "#e00000";
		var green = "#00e000";
		var blue = "#0000e0";

		this._makeDancer(0, red, [1, 1, 1, 1], 0);
		this._makeDancer(3, green, [1, 1, 1, 1], 1);
		this._makeDancer(2, blue, [0, 2, 0, 2], 2);
	}

	_createClass(Reel, [{
		key: '_makeDancer',
		value: function _makeDancer(section, colour, countIndexes, who) {
			var that = this;
			var counts = countIndexes.map(function (countIndex) {
				return that._counts[countIndex];
			});
			this._dancers.push(new RshReelDancer(section, colour, counts, who));
		}
	}, {
		key: 'calcAndMove',
		value: function calcAndMove() {
			this._dancers.forEach(function (dancer) {
				dancer.calcPosition();
				dancer.updatePosition();
			});
			this._path.push(this._dancers[this._whoToPlot].position);
		}
	}, {
		key: '_draw',
		value: function _draw() {
			var canvas = document.getElementById('canvas');
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			this._drawPath(ctx, this._path);
			this._dancers.forEach(function (dancer) {
				return dancer.draw(ctx);
			});
		}
	}, {
		key: '_drawPath',
		value: function _drawPath(ctx, path) {
			ctx.fillStyle = '#a0a0a0';
			ctx.strokeStyle = '#a0a0a0';
			path.forEach(function (xy) {
				ctx.beginPath();
				ctx.arc(xy.x, xy.y, 3, 0.0, 2.0 * Math.PI);
				ctx.fill();
				ctx.stroke();
			});
		}
	}, {
		key: '_doFrame',
		value: function _doFrame() {
			var that = this;
			console.log(this);
			this.calcAndMove();
			this._draw();
			this._timeCount += 1;
			if (this._timeCount <= this._endTimeCount) {
				window.requestAnimationFrame(function () {
					that._doFrame();
				});
			} else {
				this._endCallback();
			}
		}
	}, {
		key: 'startFrom',
		value: function startFrom(timeCount, places) {
			for (var i = 0; i < places.length; i++) {
				this._dancers[i].place(places[i]);
			}
			this._timeCount = timeCount;
		}
	}, {
		key: 'render',
		value: function render() {
			this._dancers.forEach(function (dancer) {
				dancer.calcPosition();
			});
			this._draw();
		}
	}, {
		key: 'animate',
		value: function animate(endTimeCount) {
			var that = this;
			this._endTimeCount = endTimeCount;
			console.log('pre');
			window.requestAnimationFrame(function () {
				that._doFrame();
			});
			console.log('post');
		}
	}, {
		key: 'endCallback',
		set: function set(endCallback) {
			this._endCallback = endCallback;
		}
	}]);

	return Reel;
}();

;

/*
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
};*/
//# sourceMappingURL=reel2.js.map