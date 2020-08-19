import React from "react";

class IdentificationNumber extends React.Component {

    constructor(props) {
        super(props);
    }

    asDoubleDigit(number) {
        return number < 10 ? this.leftPad(number, 1, '0') : number;
    }

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

    toDateOfBirthString(dateOfBirth) {
        const year = dateOfBirth.getFullYear().toString().slice(2);
        const month = this.asDoubleDigit(dateOfBirth.getMonth() + 1);
        const day = this.asDoubleDigit(dateOfBirth.getDate());
        return year + "." + month + "." + day;
    }

    toSerialNumberString(serialNumber) {
        if (serialNumber < 10) {
            return this.leftPad(serialNumber, 2, '0');
        } else if (serialNumber < 100) {
            return this.leftPad(serialNumber, 1, '0')
        } else {
            return serialNumber;
        }
    }

    toIdentificationNumberString(dateOfBirth = new Date(), serialNumber = 1) {
        if (typeof dateOfBirth != 'object') {
            return null;
        }
        if (typeof serialNumber != 'number') {
            return null;
        }
        if (isNaN(serialNumber)) {
            return null;
        }

        const dateOfBirthString = this.toDateOfBirthString(dateOfBirth);
        const serialNumberString = this.toSerialNumberString(serialNumber);

        // Control number calculation requires the base number to be prefixed by '2', when the Date of Birth is after the year 2000
        const controlBasePrefix = dateOfBirth > new Date("1999-12-31T23:59:59Z") ? "2" : "";
        const controlBaseNumber = controlBasePrefix.concat(dateOfBirthString.replace(/\./g, "")).concat(serialNumberString);
        const controlBaseDevision = controlBaseNumber % 97;
        const controlNumber = 97 - controlBaseDevision;

        const controlNumberString = this.asDoubleDigit(controlNumber);

        return dateOfBirthString + "-" + serialNumberString + "." + controlNumberString;
    }

    render() {
        const dateOfBirth = this.props.dateOfBirth;
        const serialNumber = this.props.serialNumber;
        return (<label>{this.toIdentificationNumberString(dateOfBirth, serialNumber)}</label>);
    }
}

export default IdentificationNumber;