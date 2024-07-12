const typeConstants = Object.freeze({
    NECESSARY: 'necessary',
    LUXURY: 'luxury'
})

const formatValidTypesString = (typesArray) => {
    if (typesArray.length === 1) {
        return typesArray[0];
    }
    const lastType = typesArray.pop();
    return `"${typesArray.join(', ')}" or "${lastType}"`;
}

module.exports = {
    typeConstants,
    formatValidTypesString
}