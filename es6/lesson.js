
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
	}

	prep() {
		let reel = new Reel(this._counts, this._whoToPlot);
		if (this._timeCount !== undefined) {
			reel.startFrom(this._timeCount, this._places);
		}
		this._reel = reel;
		this._reel.setEndCallback( () => { this.showButtons(); } );
	}

	showButtons() {
		$('#previous').prop('disabled', this._first);
		$('#play,#reset').prop('disabled', false);
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

class BaseLessons {
  constructor(lessons) {
    $('#play').click($.proxy(this._play, this));
    $('#reset').click($.proxy(this._reset, this));
    $('#next').click($.proxy(this._next, this));
    $('#previous').click($.proxy(this._previous, this));

    this._lessons = lessons;
    this._lessons.forEach(function(lesson, index, lessons) {
      lesson.firstLast(index === 0, index === lessons.length - 1);
    });

    this._show(0);
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

  _reset() {
    this._currentLesson.prep();
    this._currentLesson.show();
  };

	_next() {
		this._show(++this._lessonNumber);
	}
	_previous() {
		this._show(--this._lessonNumber);
	}
}
