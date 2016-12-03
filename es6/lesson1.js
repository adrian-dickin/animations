
class Lessons extends BaseLessons {
	constructor() {
		super([
			new Lesson([115, 100, 85], 0, 400),
			new Lesson([100, 100, 100], 0, 82),
			new Lesson([115, 100, 85], 2, 200),
			new Lesson([115, 100, 85], 2, 400,   200, [2,1,0])
		]);
	}


}
