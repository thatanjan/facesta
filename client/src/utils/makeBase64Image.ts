const makeBase64 = async (file: File, action: Function) => {
	const fileReader = new FileReader()
	fileReader.readAsDataURL(file)

	fileReader.onload = () => action(fileReader.result)
}

export default makeBase64
