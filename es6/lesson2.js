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
	
	firstLast(first, last) {
		this._first = first;
		this._last = last;
		console.log(this._first + ' ' + this._last);
	}
	
	prep() {
		let reel = new Reel(this._counts, this._whoToPlot);
		if (this._timeCount !== undefined) {
			reel.startFrom(this._timeCount, this._places);
		}
		this._reel = reel;
		this._reel.endCallback = () => this.showButtons;
	}

	showButtons() {
		$('#previous').prop('disabled', this._first);
		$('#play').prop('disabled', false);
		$('#next').prop('disabled', this._last);
	}
	
	show() {
		this.showButtons();
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
		
		this._lessons.forEach(function(lesson, index, lessons) {
			lesson.firstLast(index === 0, index === lessons.length - 1);
		});
		
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
	}
	
	_next() {
		this._show(++this._lessonNumber);
	}
	_previous() {
		this._show(--this._lessonNumber);
	}
}



