import SerialNumberConfiguration from './serialNumberConfiguration';
import {MALE, FEMALE} from "./gender";

describe('Serial number configuration of gender', () => {

    test('Male serial number configuration', () => {
        const maleConfiguration = SerialNumberConfiguration.ofGender(MALE);
        expect(maleConfiguration).not.toBeNull();
        expect(maleConfiguration.minimum).toBe(1);
        expect(maleConfiguration.maximum).toBe(997);

    });

    test('Female serial number configuration', () => {
        const femaleConfiguration = SerialNumberConfiguration.ofGender(FEMALE);
        expect(femaleConfiguration).not.toBeNull();
        expect(femaleConfiguration.minimum).toBe(2);
        expect(femaleConfiguration.maximum).toBe(998);
    });

    test('Invalid gender throws error', () => {
        expect(() => SerialNumberConfiguration.ofGender(null)).toThrow();
        expect(() => SerialNumberConfiguration.ofGender(undefined)).toThrow();
        expect(() => SerialNumberConfiguration.ofGender(0)).toThrow();
        expect(() => SerialNumberConfiguration.ofGender('test')).toThrow();
    });

});