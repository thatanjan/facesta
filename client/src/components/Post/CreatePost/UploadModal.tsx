import { useDropzone } from 'react-dropzone'
import React, { useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import checkEmptyObject from 'utils/checkEmptyObject'

interface Props {
	open: boolean
	file: any
	setOpen(value: boolean): void
	setFile(value: any): void
}

const useStyles = makeStyles({
	dropzoneStyle: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		borderWidth: 2,
		borderRadius: 2,
		borderColor: '#eeeeee',
		borderStyle: 'dashed',
		backgroundColor: '#fafafa',
		color: '#bdbdbd',
		outline: 'none',
		transition: 'border .24s ease-in-out',
	},
	activeStyle: {
		borderColor: '#2196f3',
	},
	acceptStyle: {
		borderColor: '#00e676',
	},
	rejectStyle: {
		borderColor: '#ff1744',
	},
})

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
}

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: 'border-box',
}

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden',
}

const img = {
	display: 'block',
	width: 'auto',
	height: '100%',
}

const UploadModal = ({ open, setOpen, setFile, file }: Props) => {
	const handleClose = () => {
		setOpen(false)
	}
	const { dropzoneStyle } = useStyles()

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: 'image/*, video/*',
		maxFiles: 1,
		onDrop: acceptedFiles => {
			const realFile = acceptedFiles[0]
			setFile(
				Object.assign(realFile, {
					preview: URL.createObjectURL(realFile),
				})
			)
		},
	})

	return (
		<>
			<Dialog
				onClose={handleClose}
				aria-labelledby='simple-dialog-title'
				open={open}
			>
				<DialogTitle id='simple-dialog-title'>Upload your Image</DialogTitle>
				<div className='container'>
					<div {...getRootProps()} className={dropzoneStyle}>
						<input {...getInputProps()} />
						<p>Drag 'n' drop some files here, or click to select files</p>
					</div>
				</div>

				{!checkEmptyObject(file) && (
					<aside style={thumbsContainer}>
						<div style={thumb} key={file.name}>
							<div style={thumbInner}>
								<img src={file.preview} style={img} />
							</div>
						</div>
					</aside>
				)}
				<Button onClick={handleClose}>Done</Button>
			</Dialog>
		</>
	)
}

export default UploadModal
