
class Lesson2 extends Lesson {
	prep() {
		super.prep();
		this._reel.makeDancer(3, "#e000e0", [1, 1, 1, 1], 0);
	}
}


class Lessons extends BaseLessons {
	constructor() {
		super( Lessons._makeLessons() );
	}

	static _makeLessons() {
		return [
			new Lesson([115, 100, 85], 0, 400,   200, [4,0,2]),
			new Lesson2([115, 100, 85], 0, 400,   200, [4,0,2]),
		];
	}
}
