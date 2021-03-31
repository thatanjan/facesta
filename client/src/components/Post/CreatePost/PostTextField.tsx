import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { AnyObject } from 'interfaces/global'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

interface TextFieldProps {
	inputText: string
	setInputText: Function
	cookieName: string
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

const TextFieldComponent = ({
	cookieName,
	inputText,
	setInputText,
}: TextFieldProps) => {
	const { textFieldStyle } = useStyles()

	useEffect(() => {
		const cookieValue = Cookies.get(cookieName)
		if (cookieValue) {
			setInputText(cookieValue)
		}
	}, [])

	const getScrollHeight = (elm: any) => {
		const element: any = elm

		const savedValue: string | number = elm.value
		element.value = ''
		element.baseScrollHeight = elm.scrollHeight
		element.value = savedValue
	}

	const inputChangeHandler = ({ target }: AnyObject) => {
		const targetElement: AnyObject = target

		const targetValue = target.value
		const expires = { expires: 1 / 48 }

		Cookies.set(cookieName, targetValue, expires)

		setInputText(targetValue)

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
			className={textFieldStyle}
			id='filled-multiline-static'
			label='Write Your Feelings'
			fullWidth
			multiline
			variant='filled'
			color='secondary'
			value={inputText}
			inputProps={{
				onChange: inputChangeHandler,
				className: 'autoExpand',
				rows: '3',
				dataminrows: '3',
			}}
		/>
	)
}

export default TextFieldComponent
