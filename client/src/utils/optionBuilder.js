export default class OptionBuilder {
	constructor(name, Component) {
		this.name = name
		this.Component = Component
	}

	addData(data) {
		this.data = data
		return this
	}
}
