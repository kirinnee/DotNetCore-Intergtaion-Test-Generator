import {should} from 'chai';
import {Shape} from "../../src/classLibrary/Abstract/Shape";
import {Rectangle} from "../../src/classLibrary/Concrete/Shapes/Rectangle";

should();


describe("Rectangle", () => {
	let rect: Shape = new Rectangle(5, 10);
	it("should return correct area", () => {
		rect.area.should.be.equal(50);
	});
	
	it("should return correct parameter", () => {
		rect.parameter().should.equal(30);
	});
});