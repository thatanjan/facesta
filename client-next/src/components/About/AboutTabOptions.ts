import dynamic from 'next/dynamic'
import useGetPersonal from 'hooks/useGetPersonal'

const Personal = dynamic(() => import('./personal/Personal'))

const addButtonText = (text: string) => ({ buttonText: `Add a new ${text}` })

const Random = () => {
	return 'hello'
}

class Section {
	name: string

	Component: Function

	// eslint-disable-next-line
	props: any

	formFields: any

	hook: Function

	constructor(name: string) {
		this.name = name
		this.Component = Random
	}

	addProps(props: any) {
		this.props = props
		this.props.buttonText = this.name
		return this
	}

	addFormField(fields: any) {
		this.formFields = fields
		return this
	}

	addHook(hook: Function) {
		this.hook = hook
		return this
	}

	addComponent(component: Function) {
		this.Component = component
		return this
	}
}

export const PERSONAL = 'personal'

export const personal = new Section(PERSONAL)
	.addProps(addButtonText('Change details'))
	.addComponent(Personal)
	.addHook(useGetPersonal)

export const education = new Section('Education')
	.addProps(addButtonText('School'))
	.addFormField(['School'])

export const experience = new Section('Experience')
	.addProps(addButtonText('Experience'))
	.addFormField(['Company'])

export const placesLived = new Section('Places Lived')
	.addProps(addButtonText('Place'))
	.addFormField(['city', 'town', 'country'])

export const options: Section[] = [personal, education, experience, placesLived]

export default options
