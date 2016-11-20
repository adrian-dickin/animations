
var lessonMap = {
	'lesson1': {
		current: 'lesson1',
		next: 'lesson2',
		prep: function() {
			reel.init([115, 100, 85], 0);		
		},
		show: function() {
			reel.render();
		},
		play: function() {
			reel.animate(100 * 4);
		}
	},
	'lesson2': {
		current: 'lesson2',
		previous: 'lesson1',
		next: 'lesson3',
		prep: function() {
			reel.init([100, 100, 100], 0);	
		},
		show: function() {
			reel.render();
		},
		play: function() {
			reel.animate(82);
		}
	},
	'lesson3': {
		current: 'lesson3',
		previous: 'lesson2',
		next: 'lesson4',
		prep: function() {
			reel.init([115, 100, 85], 2);
		},
		show: function() {
			reel.render();
		},
		play: function() {
			reel.animate(200);
		}
	},
	'lesson4': {
		current: 'lesson4',
		previous: 'lesson3',
		prep: function() {
			reel.init([115, 100, 85], 2);
			reel.startFrom(200, [2,1,0]);
		},
		show: function() {	
			//reel.startFrom(200, [2,3,0]);
			reel.render();
		},
		play: function() {
			//reel.startFrom(200, [2,3,0]);
			reel.animate(400);
		}
	}
};


var lessons = {
	_currentLesson: null,
	
	_play: function() {
		$('#play, #prev, #next').prop('disabled', true);
		this._currentLesson.prep();
		this._currentLesson.play();
	},
	
	_show: function(which) {
		$('.lesson-text').hide();
		this._currentLesson = lessonMap[which];
		$('#' + this._currentLesson.current).show();
		this._currentLesson.prep();
		this._currentLesson.show();	
		
		$('#previous').prop('disabled', ! this._currentLesson.previous);
		$('#next').prop('disabled', ! this._currentLesson.next);
	},
	_next: function() {
		this._show(this._currentLesson.next);
	},
	_previous: function() {
		this._show(this._currentLesson.previous);
	},	
	init: function() {
		this._show('lesson1');
		$('#play').click($.proxy(this._play, this));
		$('#next').click($.proxy(this._next, this));
		$('#previous').click($.proxy(this._previous, this));
		
		reel.setEndCallback(function() {
			$('#play, #prev, #next').prop('disabled', false);
		});
	}
};
