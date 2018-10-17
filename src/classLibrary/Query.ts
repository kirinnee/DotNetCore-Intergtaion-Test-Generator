interface IQuery {
	Post(endpoint:string, varName:string, body: string):string;
	Put(endpoint:string, varName:string, body: string):string;
	Get(endpoint:string, varName:string):string;
	Delete(endpoint:string, varName:string):string;
	Query(type: "GET"|"POST"|"PUT"|"DELETE", endpoint: string, varName:string, body:string):string;
}

class Query implements IQuery {
	
	private readonly helpVar: string;
	
	constructor(core:Core, helpVar: string) {
		if(!core.IsExtended) throw new Error("Core needs to be extended");
		this.helpVar = helpVar;
	}
	
	Delete(endpoint: string, varName: string): string {
		return `var ${varName} = await ${this.helpVar}.Delete("${endpoint}");`;
	}
	
	Get(endpoint: string, varName: string): string {
		return `var ${varName} = await ${this.helpVar}.Get("${endpoint}");`;
	}
	
	Post(endpoint: string, varName: string, body: string): string {
		return `var ${varName} = await ${this.helpVar}.Post("${endpoint}",${body});`;
	}
	
	Put(endpoint: string, varName: string, body: string): string {
		return `var ${varName} = await ${this.helpVar}.Put("${endpoint}",${body});`;
	}
	
	Query(type:  "GET"|"POST"|"PUT"|"DELETE", endpoint: string, varName: string, body: string): string {
		switch (type) {
			case "GET": return this.Get(endpoint, varName);
			case "POST" : return this.Post(endpoint, varName, body);
			case "PUT" : return this.Put(endpoint, varName, body);
			case "DELETE" : return this.Delete(endpoint, varName);
			default: throw new Error("Unknown method type: " + type);
		}
	}
	
}

export {Query, IQuery}
