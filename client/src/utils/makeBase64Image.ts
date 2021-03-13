const makeBase64 = (file: File, setState: Function) => {
	const fileReader = new FileReader()
	fileReader.readAsDataURL(file)

	fileReader.onload = () => setState(fileReader.result)
}

export default makeBase64
