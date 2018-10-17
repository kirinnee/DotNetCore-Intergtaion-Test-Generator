interface IAssert {
	StatusCode(expected: string): string;
	Response(expected: string): string;
}

class Assert implements IAssert {
	
	private readonly varName:string;
	
	constructor(core: Core, varName:string) {
		if(!core.IsExtended) throw new Error("Core needs to be extended");
		this.varName = varName;
	}
	
	Response(expected: string): string {
		return `Assert.Equal("${expected}",${this.varName}.Response);`;
	}
	
	StatusCode(expected: string): string {
		return `Assert.Equal(HttpStatusCode.${expected},${this.varName}.Code);`;
	}
	
}

export {Assert, IAssert}
