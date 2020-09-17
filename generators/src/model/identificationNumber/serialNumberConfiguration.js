import {Gender} from "../person/gender";

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

SerialNumberConfiguration.prototype.toString = function toString() {
    return "SerialNumberConfiguration minimum: " + this._minimum + ", maximum: " + this._maximum;
};

const MALE_CONFIGURATION = new SerialNumberConfiguration(1, 997);
const FEMALE_CONFIGURATION = new SerialNumberConfiguration(2, 998);

export default SerialNumberConfiguration;