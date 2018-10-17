import {should} from 'chai';
import {Kore} from '@kirinnee/core'
import {IMediator, Mediator} from "../src/classLibrary/Mediator";
import {ITest} from "../src/classLibrary/Test";
import {CSMethod} from "../src/classLibrary/CSMethod";

should();

let core: Core = new Kore();
core.ExtendPrimitives();

describe("Mediator", () => {
	
	let mediator: IMediator = new Mediator(core);
	
	it("convert Tests to CSMethods", () => {
		let tests: ITest[] = [
			{
				name: "PostTest",
				type: "POST",
				url: "/api/Product",
				body: {
					a: "A",
					b: {
						c: "C"
					}
				},
				expect: {
					StatusCode: "OK",
					Message: {
						c: "C",
						b: {
							a: "A"
						}
					}
				}
			},
			{
				name: "PutTest",
				type: "PUT",
				url: "/api/Product",
				body: {
					a: "A",
					b: {
						c: "C"
					}
				},
				expect: {
					StatusCode: "OK",
					Message: {
						c: "C",
						b: {
							a: "A"
						}
					}
				}
			}
		];
		
		let expectedContent1 =
			`public async Task PostTest()
{
	var body = new Dictionary<string,object>
	{
		{"a","A"},
		{"b",new Dictionary<string,object>{
			{"c","C"}
		}}
	};
	var resp = await _helper.Post("/api/Product",body);
	Assert.Equal(HttpStatusCode.OK,resp.Code);
	Assert.Equal("{\\"c\\":\\"C\\",\\"b\\":{\\"a\\":\\"A\\"}}",resp.Response);
}`.Remove("\n").Remove("\r").Remove("\t");
		
		let expectedContent2 =
			`public async Task PutTest()
{
	var body = new Dictionary<string,object>
	{
		{"a","A"},
		{"b",new Dictionary<string,object>{
			{"c","C"}
		}}
	};
	var resp = await _helper.Put("/api/Product",body);
	Assert.Equal(HttpStatusCode.OK,resp.Code);
	Assert.Equal("{\\"c\\":\\"C\\",\\"b\\":{\\"a\\":\\"A\\"}}",resp.Response);
}`.Remove("\n").Remove("\r").Remove("\t");;
		let expected: CSMethod[] = [
			{
				id: 0,
				name: "PostTest",
				content: expectedContent1
			},
			{
				id: 1,
				name: "PutTest",
				content: expectedContent2
			}
		];
		let actual = mediator.GenerateCSMethod(tests).Every((c:CSMethod) => c.content = c.content.Remove("\n").Remove("\r").Remove("\t"));
		actual.should.deep.equal(expected);
		
	});
});