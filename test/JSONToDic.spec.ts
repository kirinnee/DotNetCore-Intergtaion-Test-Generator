import {should} from 'chai';
import {Kore} from '@kirinnee/core'
import {JSONToDictionary, IJSONToDic} from "../src/classLibrary/JSONToDictionary";

should();

let core: Core = new Kore();
core.ExtendPrimitives();

describe("JSONToDictionary", () => {
	let parser: IJSONToDic = new JSONToDictionary(core);
	
	describe("ConvertToDictionary", () => {
		it("should parse JSON no-nest to C# Dictionary", () => {
			let json: object = {
				"businessName": "Orange Valley Nursing Home",
				"acraNumber": "1234567890",
				"contactNumber": "61234567",
				"emailAddress": "orangevalley@orangevalley.com",
				"postalCode": "123456",
				"address": "15 Kitchener Road",
				"numberOfEmployees": 5
			};
			let expected =
				`new Dictionary<string,object>
{
	{"businessName","Orange Valley Nursing Home"},
	{"acraNumber","1234567890"},
	{"contactNumber","61234567"},
	{"emailAddress","orangevalley@orangevalley.com"},
	{"postalCode","123456"},
	{"address","15 Kitchener Road"},
	{"numberOfEmployees","5"}
};`.Remove('\n').Remove('\r').Remove('\t');
			let actual = parser.ConvertToDictionary(json).Remove('\n').Remove('\r').Remove('\t');
			
			actual.should.equal(expected);
			
		});
		
		it("should parse JSON to a nested C# Dictionary", () => {
			let json: object =
				{
					"businessName": "Orange Valley Nursing Home",
					"acraNumber": 1234567890,
					"a": {
						"a": "A",
						"b": "B",
						"c": "C",
						"d": {
							"e": "E",
							"f": "F"
						}
					}
				};
			let expected =
				`new Dictionary<string,object>
{
	{"businessName","Orange Valley Nursing Home"},
	{"acraNumber","1234567890"},
	{"a",new Dictionary<string,object>{
		{"a","A"},
		{"b","B"},
		{"c","C"},
		{"d",new Dictionary<string,object>{
			{"e","E"},
			{"f","F"}
		}}
	}}
};`.Remove('\n').Remove('\r').Remove('\t');
			let actual = parser.ConvertToDictionary(json).Remove('\n').Remove('\r').Remove('\t');
			actual.should.equal(expected);
		});
		
	});
	
	describe("Escape",()=>{
		it("should escape the C# to proper string",()=>{
			let testSubj:object = {
				a:"A",
				b:{
					c:"C",
					d:{
						e:"E"
					}
				}
			};
			let expected = `{\\"a\\":\\"A\\",\\"b\\":{\\"c\\":\\"C\\",\\"d\\":{\\"e\\":\\"E\\"}}}`;
			
			let actual = parser.Escape(testSubj);
			actual.should.equal(expected);
		});
	});
	
});