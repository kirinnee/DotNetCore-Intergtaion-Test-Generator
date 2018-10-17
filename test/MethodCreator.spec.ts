import {should} from 'chai';
import {Kore} from '@kirinnee/core'
import {IMethodCreator, MethodCreator} from "../src/classLibrary/MethodCreator";

should();

let core: Core = new Kore();
core.ExtendPrimitives();

describe("MethodCreator", () => {
	let method: IMethodCreator = new MethodCreator(core);
	it("Create Test Method", () => {
	let methodContent: string =
`var vendor1 = new Dict();
var resp = await postAsync();
var x = {
	lol:lol;
}`;
	let expected: string =
`public async Task Post()
{
	var vendor1 = new Dict();
	var resp = await postAsync();
	var x = {
		lol:lol;
	}
}`;
		let actual = method.Create("Post",methodContent);
		actual.should.deep.equal(expected);
	});
});