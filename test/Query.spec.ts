import {should} from 'chai';
import {Kore} from '@kirinnee/core'
import {IQuery, Query} from "../src/classLibrary/Query";

should();

let core: Core = new Kore();
core.ExtendPrimitives();

describe("Query", () => {
	
	let q : IQuery = new Query(core, "_helper");
	
	describe("Get",()=>{
		it("should generate Get Request in C#",()=>{
			let expected = 	`var re = await _helper.Get("/api/product");`;
			let actual = q.Get("/api/product", "re");
			actual.should.equal(expected);
		});
	});
	describe("Delete",()=>{
		it("should generate Delete Request in C#",()=>{
			let expected = 	`var re = await _helper.Delete("/api/product");`;
			let actual = q.Delete("/api/product", "re");
			actual.should.equal(expected);
		});
	});
	describe("Put",()=>{
		it("should generate Put Request in C#",()=>{
			let expected = 	`var re = await _helper.Put("/api/product",body);`;
			let actual = q.Put("/api/product", "re", "body");
			actual.should.equal(expected);
		});
	});
	describe("Post",()=>{
		it("should generate Post Request in C#",()=>{
			let expected = 	`var re = await _helper.Post("/api/product",body);`;
			let actual = q.Post("/api/product", "re", "body");
			actual.should.equal(expected);
		});
	});
	
	
});