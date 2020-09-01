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