
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
	console.log(this._currentLesson);
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



