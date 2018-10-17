import {should} from 'chai';
import {Kore} from '@kirinnee/core'
import {Assert, IAssert} from "../src/classLibrary/Assert";

should();

let core: Core = new Kore();
core.ExtendPrimitives();

describe("Assert", () => {
	let assert: IAssert = new Assert(core, "re");
	describe("Assert Status code", () => {
		it("should generate C# code for the assertion", () => {
			let expected = `Assert.Equal(HttpStatusCode.OK,re.Code);`;
			let actual = assert.StatusCode("OK");
			actual.should.equal(expected);
		});
	});
	
	describe("Assert Response", () => {
		it("should generate C# code for the assertion", () => {
			let expected = `Assert.Equal("[abc]",re.Response);`;
			let actual = assert.Response("[abc]");
			actual.should.equal(expected);
		});
	});
});