export interface AnyObject {
	[key: string]: any
}

export interface AnyArray {
	[index: number]: any
	map: Function
	forEach: Function
	find: Function
}
