explicitTyping => {
	// after assigning val to var, type change not allowed
	let age: number = 35
	function login(name: string, password: string): User { ... }
	const login = (name: string, password: string): User => { ... }
	}
casting => {
	let input = document.querySelector("name") as HTMLInputElement
	}
objShape => {
	let obj: { name: string, password: string }					// declaration
	obj = { name: "name", password: "pass", id: 123 }			// assigment with error
	obj = {
		name: "name", password: "pass", id: 123
	} as { name: string, password: string, id: number }			// assigmeng with type casting
	}
interface => {
	interface Obj { name: string; password: string; }			// can`t have implementation, describe shape of obj
	let myObj: Obj = { name: "name", password: "pass" }			// ok
	function func(objOne: Obj, objTwo: Obj) { ... }

	interface Obj { id: number }								// extend current interface
	let myObj: Obj = { name: "name", password: "111", id: 12 }	// ok
	}
any => {
	let age = 34; let myAge = age as any; myAge = "35"			// type wild card, can be reassign with another type
	function add (a: any, b: any): number { ... }
	}
