import { fieldToTextField, TextFieldProps } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { AnyObject } from 'interfaces/global'
import Cookies from 'js-cookie'
import { useCallback, FormEvent, TableHTMLAttributes } from 'react'
import clsx from 'clsx'

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
	return (
		<TextField
			className={clsx(textFieldStyle, true && extraStyle)}
			id='filled-multiline-static'
			label='Write Your Feelings'
			fullWidth
			multiline
			variant='filled'
			color='secondary'
			inputProps={{
				onChange: inputChangeHandler,
				className: 'autoExpand',
				rows: cookieName === 'comment' ? '1' : '3',
				dataminrows: '3',
			}}
			{...fieldToTextField(props)}
		/>
	)
}

export default TextFieldComponent
