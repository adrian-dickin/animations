
var lesson1 = {
	show: function() {
		reel.init([115, 100, 85]);
		reel.render();
	},
	play: function() {
		reel.init([115, 100, 85]);
		reel.animate(100 * 4);
	}
};


var lessons = {
	_currentLesson: null,
	
	_play: function() {
		this._currentLesson.play();
	},
	
	init: function() {
		this._currentLesson = lesson1;
		$('#play').click($.proxy(this._play, this));
		
		lesson1.show();
	}
};
