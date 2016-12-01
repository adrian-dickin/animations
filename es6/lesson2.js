//RshReelDancer

class Lesson {
    constructor(counts, whoToPlot, endTimeCount,
			timeCount, places) {
		this._counts = counts;
		this._whoToPlot = whoToPlot;
		this._endTimeCount = endTimeCount;
		this._timeCount = timeCount;
		this._places = places;
	}
	
	prep() {
		let reel = new Reel(this._counts, this._whoToPlot);
		if (this._timeCount !== undefined) {
			reel.startFrom(this._timeCount, this._places);
		}
		this._reel = reel;
		this._reel.endCallback = function() {
			$('#play, #prev, #next').prop('disabled', false);
		};
	}

	show() {
		this._reel.render();
	}
	
	play() {
		this._reel.animate(this._endTimeCount);
	}
}

class Lessons {
	constructor() {
		this._lessons = [
			new Lesson([115, 100, 85], 0, 400),
			new Lesson([100, 100, 100], 0, 82),
			new Lesson([115, 100, 85], 2, 200),
			new Lesson([115, 100, 85], 2, 400,   200, [2,1,0])
		];
/*		this._lessonNumber = 0;
		this._currentLesson = this._lessons[this._lessonNumber];*/
		
		this._show(0);
		$('#play').click($.proxy(this._play, this));
		$('#next').click($.proxy(this._next, this));
		$('#previous').click($.proxy(this._previous, this));
	}

	_play() {
		$('#play, #prev, #next').prop('disabled', true);
		this._currentLesson.prep();
		this._currentLesson.play();
	};
	
	_show(which) {
		$('.lesson-text').hide();
		this._lessonNumber = which;
		this._currentLesson = this._lessons[this._lessonNumber];
		$('#lesson' + this._lessonNumber).show();
		this._currentLesson.prep();
		this._currentLesson.show();	
		
		$('#previous').prop('disabled', which > 0);
		$('#next').prop('disabled', which < this._lessons.length - 1);
	}
	
	_next() {
		this._show(++this._lessonNumber);
	}
	_previous() {
		this._show(--this._lessonNumber);
	}
}



