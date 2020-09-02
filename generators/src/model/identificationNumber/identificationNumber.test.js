import IdentifiationNumber from "./identifiationNumber";
import {MALE, FEMALE} from "../person/gender";
import _ from 'lodash';
import moment from 'moment';

describe('Constructor', () => {

    /**
     * Tests an IdentificationNumber's default state.
     * Since the default dateOfBirth is the date at it's moment of creation.
     * We test the control number and identification number String representation by regex.
     * In that way we don't have to provide calculations solely for the purpose of testing it's internal logic.
     */
    test('With default values', () => {
        const identifiationNumber = new IdentifiationNumber();
        expect(identifiationNumber.serialNumber).toBe(1);
        const now = new Date();
        expect(identifiationNumber.dateOfBirth.getFullYear()).toBe(now.getFullYear());
        expect(identifiationNumber.dateOfBirth.getMonth()).toBe(now.getMonth());
        expect(identifiationNumber.dateOfBirth.getDate()).toBe(now.getDate());
        expect(identifiationNumber.gender).toBe(MALE);
        expect(identifiationNumber.serialNumberString()).toBe("001");
        expect(identifiationNumber.controlNumberString()).toMatch(/\d{2}/);
        expect(identifiationNumber.toString()).toMatch(/\d{2}\.\d{2}\.\d{2}-\d{3}.\d{2}/);
        expect(identifiationNumber).toStrictEqual(identifiationNumber.clone());
    });

    test('With Ada Lovelace\'s date of birth \'10/12/1815\'', () => {
        assertIdentificationNumber(new Date(1815, 11, 10), 28, FEMALE, "028", "71", "15.12.10-028.71");
    });

    test('With valid values', () => {
        assertIdentificationNumber(new Date(1987, 5, 26), 115, MALE, "115", "04", "87.06.26-115.04");
    });

    test('With date of birth \'29/02/2016\' in leap year 2016', () => {
        assertIdentificationNumber(new Date(2016, 1, 29), 352, FEMALE, "352", "30", "16.02.29-352.30");
    });

    test('With date of birth \'17/09/2000\' in the year 2000', () => {
        assertIdentificationNumber(new Date(2000, 8, 17), 59, MALE, "059", "08", "00.09.17-059.08");
    });

    test('With date of birth \'06/02/1975\' before the year 2000', () => {
        assertIdentificationNumber(new Date(1975, 1, 6), 22, FEMALE, "022", "29", "75.02.06-022.29");
    });

    test('With date of birth \'23/10/2004\' after the year 2000', () => {
        assertIdentificationNumber(new Date(2004, 9, 23), 5, MALE, "005", "70", "04.10.23-005.70");
    });

    var assertIdentificationNumber = function (dateOfBirth, serialNumber, expectedGender, expectedSerialNumberString, expectedControlNumberString, expectedIdentificationNumberString) {
        const identifiationNumber = new IdentifiationNumber(dateOfBirth, serialNumber);
        expect(identifiationNumber.serialNumber).toBe(serialNumber);
        expect(identifiationNumber.dateOfBirth.getFullYear()).toBe(dateOfBirth.getFullYear());
        expect(identifiationNumber.dateOfBirth.getMonth()).toBe(dateOfBirth.getMonth());
        expect(identifiationNumber.dateOfBirth.getDate()).toBe(dateOfBirth.getDate());
        expect(identifiationNumber.gender).toBe(expectedGender);
        expect(identifiationNumber.serialNumberString()).toBe(expectedSerialNumberString);
        expect(identifiationNumber.controlNumberString()).toBe(expectedControlNumberString);
        expect(identifiationNumber.toString()).toBe(expectedIdentificationNumberString);
        expect(identifiationNumber).toStrictEqual(identifiationNumber.clone());
    }

});

describe('Validate serial number', () => {
    test('With valid numbers', () => {
        expect(IdentifiationNumber.validSerialNumber(1)).toBe(1);
        expect(IdentifiationNumber.validSerialNumber(998)).toBe(998);
        expect(IdentifiationNumber.validSerialNumber(284)).toBe(284);
    });

    test('\'0\' throws error', () => {
        expect(() => {
            IdentifiationNumber.validSerialNumber(0)
        }).toThrow('Serial number \'0\' should be between 1 and 998 (incl).');
    });

    test('\'999\' throws error', () => {
        expect(() => {
            IdentifiationNumber.validSerialNumber(999)
        }).toThrow('Serial number \'999\' should be between 1 and 998 (incl).');
    });

    test('\'null\' throws error', () => {
        expect(() => {
            IdentifiationNumber.validSerialNumber(null)
        }).toThrow('The serial number cannot be \'null\' or \'undefined\'.');
    });

    test('\'undefined\' throws error', () => {
        expect(() => {
            IdentifiationNumber.validSerialNumber(undefined)
        }).toThrow('The serial number cannot be \'null\' or \'undefined\'.');
    });

    test('\'a\' (non number) throws error', () => {
        expect(() => {
            IdentifiationNumber.validSerialNumber('a')
        }).toThrow('Serial number \'a\' should of type \'Number\'.');
    });
});

describe('Validate date of birth', () => {
    test('Valid dates', () => {
        const now = new Date();
        expect(IdentifiationNumber.validDateOfBirth(now)).toBe(now);
        const albertEinsteinDateOfBirth = new Date(1879, 2, 14);
        expect(IdentifiationNumber.validDateOfBirth(albertEinsteinDateOfBirth)).toBe(albertEinsteinDateOfBirth);
    });

    test('Date of birth in the future throws error', () => {
        const tomorrow = moment().add(1, 'days').toDate();
        expect(() => {
            IdentifiationNumber.validDateOfBirth(tomorrow)
        }).toThrow('Date of birth \'' + tomorrow + '\' cannot be in the future.');
    });

    test('\'null\' throws error', () => {
        expect(() => {
            IdentifiationNumber.validDateOfBirth(null)
        }).toThrow('The date of birth cannot be \'null\' or \'undefined\'.');
    });

    test('\'undefined\' throws error', () => {
        expect(() => {
            IdentifiationNumber.validDateOfBirth(undefined)
        }).toThrow('The date of birth cannot be \'null\' or \'undefined\'.');
    });

    test('\'a\' (non date) throws error', () => {
        expect(() => {
            IdentifiationNumber.validDateOfBirth('a')
        }).toThrow('Date of birth \'a\' should of type \'Date\'.');
    });
})


