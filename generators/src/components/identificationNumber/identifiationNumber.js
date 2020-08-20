import moment from 'moment';

class IdentifiationNumber {

    constructor(dateOfBirth, serialNumber) {
        this._dateOfBirthMoment = moment(dateOfBirth);
        this._serialNumber = serialNumber;
    }

    get dateOfBirth() {
        return new Date(this._dateOfBirthMoment.toArray());
    }

    get dateOfBirthMoment() {
        return this._dateOfBirthMoment;
    }

    get serialNumber() {
        return this._serialNumber;
    }

    get gender() {
        return this._serialNumber % 2 === 0 ? 'FEMALE' : 'MALE';
    }

    //

    /**
     * Left pad a String with a specified String.
     *
     * @param string - the String to pad out
     * @param size - the number of times the padString will be padded to the left of the String
     * @param padString - the String to pad with
     * @returns {*}
     */
    leftPad(string, size, padString) {
        return padString.repeat(size) + string;
    }

    serialNumberString() {
        if (this._serialNumber < 10) {
            return this.leftPad(this._serialNumber, 2, '0');
        } else if (this._serialNumber < 100) {
            return this.leftPad(this._serialNumber, 1, '0')
        } else {
            return this._serialNumber;
        }
    }

    controlNumberString() {
        const serialNumberString = this.serialNumberString();

        // Control number calculation requires the base number to be prefixed by '2', when the Date of Birth is after the year 2000
        const controlBasePrefix = this._dateOfBirthMoment.isAfter("1999-12-31T23:59:59Z", 'day') ? "2" : "";
        const controlBaseNumber = controlBasePrefix.concat(this._dateOfBirthMoment.format("YYMMDD")).concat(serialNumberString);
        const controlBaseDevision = controlBaseNumber % 97;
        const controlNumber = 97 - controlBaseDevision;

        return controlNumber < 10 ? this.leftPad(controlNumber, 1, '0') : controlNumber;
    }

    toString() {
        if (typeof this._dateOfBirthMoment != 'object') {
            return null;
        }
        if (typeof this._serialNumber != 'number') {
            return null;
        }
        if (isNaN(this._serialNumber)) {
            return null;
        }
        return this._dateOfBirthMoment.format("YY.MM.DD") + "-" + this.serialNumberString() + "." + this.controlNumberString();
    }

}

export default IdentifiationNumber;