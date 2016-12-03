
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
		this._reel.setEndCallback( () => { this.showButtons(); } );
	}

	showButtons() {
		console.log('show buttons');
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


