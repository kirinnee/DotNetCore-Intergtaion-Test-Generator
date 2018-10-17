interface ITest {
	name:string,
	type: "POST" |"GET" | "PUT" | "DELETE";
	url: string;
	body: object;
	expect: IExpect;
 }

interface IExpect{
	StatusCode: string;
	Message: object;
}

export { IExpect, ITest}
