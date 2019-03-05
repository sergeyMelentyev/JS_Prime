explicitTyping => {
	// after assigning val to var, type change not allowed
	let age: number = 35
	function login(name: string, password: string): User { ... }
	const login = (name: string, password: string): User => { ... }
	}
casting => {
	let input = document.querySelector("name") as HTMLInputElement
	}
functions => {
	//
	}
objShape => {
	type ISecuritiesState = {
	  renewStamps: { [k: number]: number };
	};
	}
interface => {
	interface Obj { name: string; password: string; }		// can`t have implementation, describe shape of obj
	interface Obj { id: number }							// extend current interface
	interface NewObj extends Obj { field: "value" }			// extend current interface

	let myObj: Obj = { name: "name", password: "pass" }
	function func(objOne: Obj, objTwo: Obj) { ... }
	}
typeAliase => {
	// can be exported and consume in other module
	type Color = [number, number, number]
	let red: Color = [255, 0, 0]
	}
any => {
	let age = 34; let myAge = age as any; myAge = "35"		// type wild card, can be reassign with another type
	function add (a: any, b: any): number { ... }
	}
class => {
	class Car {
		make: string
		model: string
		year: number
		constructor(make: string, model: string, year: number) {
			this.make = make; this.model = model; this.year = year
		}
		startEngine() { return "VROOM" }
	}
	let car = new Car("Mazda", "2", 2008)
	}
array => {
	let nums: number[] = [1,2,3]							// var
	class ShoppingCart {
		items: number[] = new Array()						// class props
		constructor() { this.items.push(5) }
	}
	var arr: MyObj[] = new Array()							// array of obj of type Obj

	let dep: [string, number]; dep = ["react", 16]			// arr of tuples
	let deps: [string, number][] = new Array()
	}
tuples => {
	// arr of fixed length
	let dep: [string, number]
	dep = ["react", 16]
	}
enums => {
	enum AcctType {
		Checking,
		Saving,
		MoneyMarket
	}
	type Acct = [number, AcctType]
	let account: Acct = [9000, AcctType.Checking]
	}
set => {
	uuidsValidatedList: Set<string>;
	}
reactProps => {
	// callback
	interface Props {
		onRevokeKeySubmit(event: any): void;
	}
	}
events => {
    <ListItemText
      primary={title}
      onClick={this.handleClick(item)}
    />

    handleClick = (item: any) => () => {
    	const { handleRead } = this.props;
    	handleRead(item);
  	};
}
