import {Gender, MALE, FEMALE} from './gender';

describe('Gender', () => {

    test('\'MALE\' should be a male', () => {
        expect(Gender.isMale(MALE)).toBe(true);
    });

    test('\'FEMALE\' should be a female', () => {
        expect(Gender.isFemale(FEMALE)).toBe(true);
    });

    test('\'FEMALE\' should NOT be a male', () => {
        expect(Gender.isMale(FEMALE)).not.toBe(true);
    });

    test('\'MALE\' should NOT be a female', () => {
        expect(Gender.isFemale(MALE)).not.toBe(true);
    });

    test('\'a\' should NOT be a male', () => {
        expect(Gender.isMale('a')).not.toBe(true);
    });

    test('\'a\' should NOT be a female', () => {
        expect(Gender.isFemale('a')).not.toBe(true);
    });

});

describe('Validate gender', () => {

    test('With valid genders', () => {
        expect(Gender.validGender(MALE)).toBe(MALE);
        expect(Gender.validGender(FEMALE)).toBe(FEMALE);
    });

    test('\'null\' throws error', () => {
        expect(() => {
            Gender.validGender(null)
        }).toThrow('Gender cannot be \'null\' or \'undefined\'.');
    });

    test('\'undefined\' throws error', () => {
        expect(() => {
            Gender.validGender(null)
        }).toThrow('Gender cannot be \'null\' or \'undefined\'.');
    });

    test('\'0\' throws error', () => {
        expect(() => {
            Gender.validGender(0)
        }).toThrow('Gender \'0\' should of type \'String\'.');
    });

    test('\'test\' throws error', () => {
        expect(() => {
            Gender.validGender('test')
        }).toThrow('Gender \'test\' should be one of \'MALE,FEMALE\'.');
    });

});