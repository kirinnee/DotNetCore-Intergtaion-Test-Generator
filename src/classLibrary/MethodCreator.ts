interface IMethodCreator {
	Create(name: string, content: string): string;
}

class MethodCreator implements IMethodCreator {
	
	constructor(core: Core) {
		if (!core.IsExtended) throw new Error("Core needs to be extended");
	}
	
	Create(name: string, content: string): string {
		return `public async Task ${name}()
{\n`
		+ content.LineBreak().Each((s: string) => "\t" + s).join('\n')
		+"\n}"
	}
	
	
}

export {MethodCreator, IMethodCreator};