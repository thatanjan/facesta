type SetState = (val: boolean) => void

const showAlert = (setState: SetState) => {
	setState(true)

	setTimeout(() => {
		setState(false)
	}, 4000)
}

export default showAlert
