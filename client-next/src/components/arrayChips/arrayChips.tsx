import React from 'react'
import { nanoid } from 'nanoid'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

interface Props {
	skills: string[]
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center',
			flexWrap: 'wrap',
			listStyle: 'none',
			padding: theme.spacing(0.5),
			margin: 0,
		},
		chip: {
			margin: theme.spacing(0.5),
		},
	})
)

const ArrayChips = ({ skills }: Props) => {
	const { chip, root } = useStyles()

	return (
		<>
			<Paper component='ul' className={root}>
				{skills.map((item: string) => (
					<li key={nanoid()}>
						<Chip label={item} className={chip} />
					</li>
				))}
			</Paper>
		</>
	)
}

export default ArrayChips
