import {Shape} from "../../Abstract/Shape";

class Rectangle implements Shape {
	
	width: number;
	height: number;
	
	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
	
	get area(): number {
		return this.width * this.height;
	}
	
	parameter(): number {
		return this.width * 2 + this.height * 2;
	}
	
}

export {Rectangle};