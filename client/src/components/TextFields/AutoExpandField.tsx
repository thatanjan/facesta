import { fieldToTextField, TextFieldProps } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { AnyObject } from 'interfaces/global'
import Cookies from 'js-cookie'
import { FormEvent } from 'react'
import clsx from 'clsx'

import { POST_TITLE } from 'components/Post/CreatePost/CreatePostModal'

interface Props extends TextFieldProps {
	cookieName?: string
	extraStyle?: string
}

const useStyles = makeStyles(theme => ({
	textFieldStyle: {
		'& > label': {
			[theme.breakpoints.down('xs')]: {
				fontSize: theme.typography.body2.fontSize,
			},
		},
	},
}))

interface InformationForField {
	label: string
	rows: string
}

const informationForField = (name: string): InformationForField => {
	switch (name) {
		case 'comment':
			return { label: name, rows: '1' }

		case POST_TITLE:
			return { label: 'title', rows: '1' }

		default:
			return { label: 'Write your feelings', rows: '3' }
	}
}

const TextFieldComponent = (props: Props) => {
	const {
		cookieName,
		extraStyle,
		field: { name },
		form: { setFieldValue },
	} = props

	const { textFieldStyle } = useStyles()

	const getScrollHeight = (elm: any) => {
		const element: any = elm

		const savedValue: string | number = elm.value
		element.value = ''
		element.baseScrollHeight = elm.scrollHeight
		element.value = savedValue
	}

	const inputChangeHandler = ({
		target,
	}: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const targetElement: AnyObject = target

		const { value: targetValue } = target as HTMLTextAreaElement
		const expires = { expires: 1 / 48 }

		Cookies.set(cookieName || name, targetValue, expires)

		setFieldValue(name, targetValue)

		// make sure the input event originated from a textarea and it's desired to be auto-expandable
		if (
			!targetElement.classList.contains('autoExpand') ||
			targetElement.nodeName !== 'TEXTAREA'
		)
			return

		const minRows = targetElement.getAttribute('data-min-rows') || 0
		let rows: number | boolean | void =
			!targetElement.baseScrollHeight && getScrollHeight(targetElement)

		targetElement.rows = minRows
		rows = Math.ceil(
			(targetElement.scrollHeight - targetElement.baseScrollHeight) / 16
		)
		targetElement.rows = minRows + rows
	}

	const { label, rows } = informationForField(name)

	return (
		<TextField
			className={clsx(textFieldStyle, true && extraStyle)}
			id='filled-multiline-static'
			label={label}
			fullWidth
			multiline
			variant='filled'
			color='secondary'
			inputProps={{
				onChange: inputChangeHandler,
				className: 'autoExpand',
				rows,
				dataminrows: rows,
			}}
			{...fieldToTextField(props)}
		/>
	)
}

export default TextFieldComponent
