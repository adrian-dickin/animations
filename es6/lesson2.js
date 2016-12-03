
class Lessons {
	constructor() {
		this._lessons = [
			new Lesson([115, 100, 85], 0, 400,   200, [4,0,2])
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



