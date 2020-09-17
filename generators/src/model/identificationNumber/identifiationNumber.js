import moment from 'moment';
import {MALE, FEMALE} from "../person/gender";
import {isNil, isDate, isNumber, inRange, padStart} from 'lodash';
import SerialNumberConfiguration from "./serialNumberConfiguration";

/**
 * Represents the Belgian Identification Number.
 * 'Rijksregisternummer' in Dutch or 'Numéro de registre National' in French.
 *
 * Src - Wikipedia - NL: https://nl.wikipedia.org/wiki/Rijksregisternummer
 * Src - Wikipedia - FR: https://fr.wikipedia.org/wiki/Num%C3%A9ro_de_registre_national
 *
 * Src - Federale Overheidsdienst Binnenlandse Zaken - NL:
 * https://www.ibz.rrn.fgov.be/nl/rijksregister/faq/meer-technische-informatie-it-autogeneratie-wijzigingen/ Src - Service public fédéral Intérieur -
 * FR: https://www.ibz.rrn.fgov.be/fr/registre-national/faq/questions-plus-techniques-ti-auto-generation-modifications/
 */
class IdentifiationNumber {
    #dateOfBirthMoment

    /**
     * Creates a new (sealed) identification number.
     *
     * @param dateOfBirth date of birth or today by default
     * @param serialNumber serial number or 1 by default
     */
    constructor(dateOfBirth = new Date(), serialNumber = 1) {
        this._dateOfBirth = IdentifiationNumber.validDateOfBirth(dateOfBirth);
        this.#dateOfBirthMoment = moment(dateOfBirth);
        this._serialNumber = IdentifiationNumber.validSerialNumber(serialNumber);

        /**
         * Prevent new properties from being added.
         * Only allow property values to be changed when writable!
         */
        Object.seal(this);
    }

    /**
     * Get the date of birth as a date object.
     * @returns {Date} date of birth
     */
    get dateOfBirth() {
        return this._dateOfBirth;
    }

    /**
     * Set the date of birth.
     * @param dateOfBirth date object
     */
    set dateOfBirth(dateOfBirth) {
        this._dateOfBirth = IdentifiationNumber.validDateOfBirth(dateOfBirth);
        this.#dateOfBirthMoment = moment(dateOfBirth);
    }

    /**
     * Get the serial number.
     * @returns {number} serial number
     */
    get serialNumber() {
        return this._serialNumber;
    }

    /**
     * Set the serial number.
     * @param serialNumber
     */
    set serialNumber(serialNumber) {
        this._serialNumber = IdentifiationNumber.validSerialNumber(serialNumber);
    }

    get gender() {
        return this._serialNumber % 2 === 0 ? FEMALE : MALE;
    }

    get serialNumberConfiguration() {
        return SerialNumberConfiguration.ofGender(this.gender);
    }

    static validDateOfBirth(dateOfBirth) {
        if (isNil(dateOfBirth)) {
            throw new Error("The date of birth cannot be 'null' or 'undefined'.");
        } else if (!isDate(dateOfBirth)) {
            throw new Error("Date of birth '" + dateOfBirth + "' should of type 'Date'.");
        } else if (dateOfBirth > Date.now()) {
            throw new Error("Date of birth '" + dateOfBirth + "' cannot be in the future.");
        } else {
            return dateOfBirth;
        }
    }

    static validSerialNumber(serialNumber) {
        if (isNil(serialNumber)) {
            throw new Error("The serial number cannot be 'null' or 'undefined'.");
        } else if (!isNumber(serialNumber)) {
            throw new Error("Serial number '" + serialNumber + "' should of type 'Number'.");
        } else if (!inRange(serialNumber, 1, 999)) {
            throw new Error("Serial number '" + serialNumber + "' should be between 1 and 998 (incl).");
        } else {
            return serialNumber;
        }
    }

    /**
     * The serial number represents the second group of the identification number.
     * Formatted, it's required the number always contains three digits.
     * Lower numbers will therefore be supplemented with '0' until a total of three digits is reached.
     *
     * @returns {String} serial number consisting of three digits
     */
    serialNumberString() {
        return padStart(this._serialNumber, 3, '0');
    }

    /**
     * The control number represents the third group of the identification number.
     * @returns {*}
     */
    controlNumberString() {
        // Control number calculation requires the base number to be prefixed by '2', when the Date of Birth is after the year 2000
        const controlBasePrefix = this.#dateOfBirthMoment.isAfter("1999-12-31T23:59:59Z", 'day') ? "2" : "";
        const controlBaseNumber = controlBasePrefix.concat(this.#dateOfBirthMoment.format("YYMMDD")).concat(this.serialNumberString());
        const controlBaseDevision = controlBaseNumber % 97;
        const controlNumber = 97 - controlBaseDevision;

        return padStart(controlNumber, 2, '0');
    }

    toString() {
        return this.#dateOfBirthMoment.format("YY.MM.DD") + "-" + this.serialNumberString() + "." + this.controlNumberString();
    }

    /**
     * Clones this date of birth and serial number into a new Identification Number.
     * @returns {IdentifiationNumber}
     */
    clone() {
        return new IdentifiationNumber(this._dateOfBirth, this._serialNumber);
    }

}

export default IdentifiationNumber;