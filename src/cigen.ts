import {Kore} from "@kirinnee/core";//
import program from "commander";//
import chalk from "chalk"; //
import {Shape} from "./classLibrary/Abstract/Shape";
import {Rectangle} from "./classLibrary/Concrete/Shapes/Rectangle";

let core :Core = new Kore();//
core.ExtendPrimitives();//

program
    .version("0.0.1")
    .description("A Tool to generate C# xUnit Integration Test from JSON format");

program.parse(process.argv);

let rect: Shape = new Rectangle(5,12);
console.log("Parameter:", rect.parameter());
console.log("Area", rect.area);

Program().then();

async function Program(){

    console.log("End of program~");
}