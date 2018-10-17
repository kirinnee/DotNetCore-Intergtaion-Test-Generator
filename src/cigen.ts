import {Kore, SortType} from "@kirinnee/core";
import program from "commander";
import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import {ITest} from "./classLibrary/Test";
import {CSMethod} from "./classLibrary/CSMethod";
import {Mediator} from "./classLibrary/Mediator";

let core: Core = new Kore();
core.ExtendPrimitives();

program
	.version("0.0.1")
	.description("A Tool to generate C# xUnit Integration Test from JSON format");



program
	.command("gen <json>", )
	.action(async function(dir:string) {
		
		let p = path.resolve(process.cwd(), dir);
		console.log(chalk.cyan("starting...", p));
		if (dir.GetExtension() !== ".json") console.log(chalk.redBright("Needs to be a JSON File"));
		if (!fs.existsSync(p)) console.log(chalk.redBright("File does not exist"));
		//Read file
		let content = fs.readFileSync(p, 'utf8');
		let tests: ITest[] = JSON.parse(content);
		let methods: CSMethod[] = new Mediator(core).GenerateCSMethod(tests);
		let finalMethod = GenerateTestMethod(methods);

		let fileContent = methods.Each((c:CSMethod)=>c.content).join("\n") + "\n\n" + finalMethod;
		let o = p.ChangeExtension("txt");
		fs.writeFileSync(o, fileContent, 'utf8');
		console.log("done");
	});

program.parse(process.argv);

function GenerateTestMethod(methods: CSMethod[]):string{
	let method =
		`[Fact]
public async Task Test_Endpoints()
{`;
	let m:string = methods.Sort(SortType.AscendingNumerical, (c:CSMethod)=>c.id)
		.Each((c:CSMethod) => `\n\tawait ${c.name}();`).join('');
	return method + m + "\n}";
	
}