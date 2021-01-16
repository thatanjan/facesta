export interface Data {
	name: string
	details: string
	avatar: string
}

export default class OptionBuilder {
	name: string

	Component: Function

	hook: Function

	constructor(name: string, Component: Function) {
		this.name = name
		this.Component = Component
	}

	addHook(hook: Function) {
		this.hook = hook
		return this
	}
}
