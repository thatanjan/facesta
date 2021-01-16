export interface Data {
	name: string
	details: string
	avatar: string
}

export default class OptionBuilder {
	name: string

	Component: Function

	data: any

	constructor(name: string, Component: Function) {
		this.name = name
		this.Component = Component
	}

	addData(data: Data[]) {
		this.data = data
		return this
	}
}
