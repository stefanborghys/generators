import {Gender} from "./gender";

class SerialNumberConfiguration {

    constructor(minimum, maximum) {
        this._minimum = minimum;
        this._maximum = maximum;
    }

    get minimum() {
        return this._minimum;
    }

    get maximum() {
        return this._maximum;
    }

    static ofGender(gender) {
        return Gender.isMale(Gender.validGender(gender)) ? MALE_CONFIGURATION : FEMALE_CONFIGURATION;
    }

}

const MALE_CONFIGURATION = new SerialNumberConfiguration(1, 997);
const FEMALE_CONFIGURATION = new SerialNumberConfiguration(2, 998);

export default SerialNumberConfiguration;