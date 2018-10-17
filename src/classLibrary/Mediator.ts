import {ITest} from "./Test";
import {CSMethod} from "./CSMethod";
import {IMethodCreator, MethodCreator} from "./MethodCreator";
import {IJSONToDic, JSONToDictionary} from "./JSONToDictionary";
import {Assert, IAssert} from "./Assert";
import {IQuery, Query} from "./Query";

interface IMediator {
	GenerateCSMethod(test:ITest[]): CSMethod[];
}

class Mediator implements IMediator {
	
	private readonly method : IMethodCreator;
	private readonly jTd : IJSONToDic;
	private readonly assert : IAssert;
	private readonly query: IQuery;
	
	GenerateCSMethod(test: ITest[]): CSMethod[] {
		return test.Each((t:ITest, i:number) => {
			let dictionary = "var body = "+ this.jTd.ConvertToDictionary(t.body);
			let resp = this.query.Query(t.type, t.url, "resp", "body");
			let assertCode = this.assert.StatusCode(t.expect.StatusCode);
			let expectedResp = this.jTd.Escape(t.expect.Message);
			let assertResp = this.assert.Response(expectedResp);
			let content = this.method.Create(t.name, dictionary+"\n" + resp +"\n" + assertCode +"\n"+assertResp);
			return {
				id: i,
				name: t.name,
				content: content
			}
		});
	}
	constructor(core:Core) {
		if(!core.IsExtended) throw new Error("Core is not extended");
		this.method = new MethodCreator(core);
		this.assert = new Assert(core,"resp");
		this.jTd = new JSONToDictionary(core);
		this.query = new Query(core,"_helper");
	}
	
}

export {Mediator, IMediator}
