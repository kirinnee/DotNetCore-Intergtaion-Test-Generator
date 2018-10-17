
interface IJSONToDic{
	ConvertToDictionary(data:object):string;
	Escape(data:object):string;
}

class JSONToDictionary implements IJSONToDic{
	
	constructor(core:Core){
		if(!core.IsExtended) throw new Error("Core needs to be extended");
	}
	
	ConvertToDictionary(data: object): string {
		return this.ConvertToObject(data,1)+";";
	}
	
	ConvertToObject(obj:object, tab: number):string{
		let csharp = "new Dictionary<string,object>\n{\n";
		for(let k in obj){
			if(obj.hasOwnProperty(k)){
				let v = obj[k];
				if(typeof v !== "object"){
					csharp += "\t".repeat(tab) + `{"${k}","${v}"},\n`
				}else{
					let val = this.ConvertToObject(v,tab+1);
					csharp += "\t".repeat(tab)  + `{"${k}",${val}},\n`
				}
			}
		}
		csharp = csharp.trim();
		if(csharp.TakeLast(1)===",") csharp = csharp.Cut(1);
		csharp += "\n}";
		return csharp;
	}
	
	Escape(data: object): string {
		return JSON.stringify(data).ReplaceAll("\"","\\\"");
	}
	
}

export {JSONToDictionary,IJSONToDic};