const makeBase64 = (file: File) => {
	const fileReader = new FileReader()
	fileReader.readAsDataURL(file)

	console.log(fileReader.result)

	return (fileReader.onload = () => fileReader.result)
}

export default makeBase64
