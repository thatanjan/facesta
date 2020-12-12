export const filterUniqueString = (array, compareArray) => {
    if (compareArray.length === 0) {
        return array
    }

    let newSkills = []

    newSkills = array.filter(function (obj) {
        return compareArray.indexOf(obj) == -1
    })

    return newSkills
}
