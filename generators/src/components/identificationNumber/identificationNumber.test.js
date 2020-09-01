import IdentifiationNumber from "./identifiationNumber";
import {MALE, FEMALE} from "./gender";
import _ from 'lodash';
import moment from 'moment';

describe('Constructor', () => {

    test('With default values', () => {
        const identifiationNumber = new IdentifiationNumber();
        expect(identifiationNumber.serialNumber).toBe(1);
        const now = new Date();
        expect(identifiationNumber.dateOfBirth.getFullYear()).toBe(now.getFullYear());
        expect(identifiationNumber.dateOfBirth.getMonth()).toBe(now.getMonth());
        expect(identifiationNumber.dateOfBirth.getDate()).toBe(now.getDate());
        expect(identifiationNumber.gender).toBe(MALE);
        expect(identifiationNumber.serialNumberString()).toBe("001");
        expect(identifiationNumber.controlNumberString()).toBe("93");
        expect(identifiationNumber.toString()).toBe((now.getYear() - 100) + "." + _.padStart(now.getMonth() + 1, 2, '0') + "." + _.padStart(now.getDate(), 2, '0') + "-001.93");
        expect(identifiationNumber).toStrictEqual(identifiationNumber.clone());
    });

    test('With valid values', () => {
        const adaLovelaceDateOfBirth = new Date(1815, 11, 10);
        const identifiationNumber = new IdentifiationNumber(adaLovelaceDateOfBirth, 28);
        expect(identifiationNumber.serialNumber).toBe(28);
        expect(identifiationNumber.dateOfBirth.getFullYear()).toBe(adaLovelaceDateOfBirth.getFullYear());
        expect(identifiationNumber.dateOfBirth.getMonth()).toBe(adaLovelaceDateOfBirth.getMonth());
        expect(identifiationNumber.dateOfBirth.getDate()).toBe(adaLovelaceDateOfBirth.getDate());
        expect(identifiationNumber.gender).toBe(FEMALE);
        expect(identifiationNumber.serialNumberString()).toBe("028");
        expect(identifiationNumber.controlNumberString()).toBe("71");
        expect(identifiationNumber.toString()).toBe("15.12.10-028.71");
        expect(identifiationNumber).toStrictEqual(identifiationNumber.clone());
    });

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
        }).toThrow('The serial number cannot be \'null\' or \'undefined.\'');
    });

    test('\'undefined\' throws error', () => {
        expect(() => {
            IdentifiationNumber.validSerialNumber(undefined)
        }).toThrow('The serial number cannot be \'null\' or \'undefined.\'');
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
        }).toThrow('The date of birth cannot be \'null\' or \'undefined.\'');
    });

    test('\'undefined\' throws error', () => {
        expect(() => {
            IdentifiationNumber.validDateOfBirth(undefined)
        }).toThrow('The date of birth cannot be \'null\' or \'undefined.\'');
    });

    test('\'a\' (non date) throws error', () => {
        expect(() => {
            IdentifiationNumber.validDateOfBirth('a')
        }).toThrow('Date of birth \'a\' should of type \'Date\'.');
    });
})


