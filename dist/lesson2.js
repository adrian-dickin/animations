'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//RshReelDancer

var Lesson = function () {
	function Lesson(counts, whoToPlot, endTimeCount, timeCount, places) {
		_classCallCheck(this, Lesson);

		this._counts = counts;
		this._whoToPlot = whoToPlot;
		this._endTimeCount = endTimeCount;
		this._timeCount = timeCount;
		this._places = places;
	}

	_createClass(Lesson, [{
		key: 'prep',
		value: function prep() {
			var reel = new Reel(this._counts, this._whoToPlot);
			if (this._timeCount !== undefined) {
				reel.startFrom(this._timeCount, this._places);
			}
			this._reel = reel;
			this._reel.endCallback = function () {
				$('#play, #prev, #next').prop('disabled', false);
			};
		}
	}, {
		key: 'show',
		value: function show() {
			this._reel.render();
		}
	}, {
		key: 'play',
		value: function play() {
			this._reel.animate(this._endTimeCount);
		}
	}]);

	return Lesson;
}();

var Lessons = function () {
	function Lessons() {
		_classCallCheck(this, Lessons);

		this._lessons = [new Lesson([115, 100, 85], 0, 400), new Lesson([100, 100, 100], 0, 82), new Lesson([115, 100, 85], 2, 200), new Lesson([115, 100, 85], 2, 400, 200, [2, 1, 0])];
		/*		this._lessonNumber = 0;
  		this._currentLesson = this._lessons[this._lessonNumber];*/

		this._show(0);
		$('#play').click($.proxy(this._play, this));
		$('#next').click($.proxy(this._next, this));
		$('#previous').click($.proxy(this._previous, this));
	}

	_createClass(Lessons, [{
		key: '_play',
		value: function _play() {
			$('#play, #prev, #next').prop('disabled', true);
			this._currentLesson.prep();
			this._currentLesson.play();
		}
	}, {
		key: '_show',
		value: function _show(which) {
			$('.lesson-text').hide();
			this._lessonNumber = which;
			this._currentLesson = this._lessons[this._lessonNumber];
			$('#lesson' + this._lessonNumber).show();
			console.log('#lesson' + this._lessonNumber);
			this._currentLesson.prep();
			this._currentLesson.show();

			$('#previous').prop('disabled', which > 0);
			$('#next').prop('disabled', which < this._lessons.length - 1);
		}
	}, {
		key: '_next',
		value: function _next() {
			this._show(++this._lessonNumber);
		}
	}, {
		key: '_previous',
		value: function _previous() {
			this._show(--this._lessonNumber);
		}
	}]);

	return Lessons;
}();
//# sourceMappingURL=lesson2.js.map
