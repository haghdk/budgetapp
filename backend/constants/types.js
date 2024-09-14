class SpendingTypes {
    types = {};

    constructor() {
        this.types = Object.freeze({
            NECESSARY: "necessary",
            LUXURY: "luxury",
        });
    }

    formatValidTypesString = () => {
        const typesArray = Object.values(this.types);
        if (typesArray.length === 1) {
            return typesArray[0];
        }
        const lastType = typesArray.pop();
        return `"${typesArray.join(", ")}" or "${lastType}"`;
    };
}

module.exports = new SpendingTypes();
