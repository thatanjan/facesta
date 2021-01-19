import React from 'react'
import { nanoid } from 'nanoid'
import Chip from '@material-ui/core/Chip'
import { makeStyles, Theme } from '@material-ui/core/styles'

interface Props {
	skills: string[]
}

const useStyles = makeStyles((theme: Theme) => ({
	chip: {
		margin: theme.spacing(0.5),
	},
}))

const ArrayChips = ({ skills }: Props) => {
	const { chip } = useStyles()

	return (
		<>
			{skills.map((item: string) => (
				<li key={nanoid()}>
					<Chip label={item} className={chip} />
				</li>
			))}
		</>
	)
}

export default ArrayChips
