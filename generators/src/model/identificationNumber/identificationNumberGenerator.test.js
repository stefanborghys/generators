import IdentificationNumberGenerator from './identificationNumberGenerator';
import IdentifiationNumber from "./identifiationNumber";

describe('Identification number generator', () => {

    test('Random', () => {
        const randomIdentificationNumber = IdentificationNumberGenerator.random();
        expect(randomIdentificationNumber).not.toBeNull();
        expect(randomIdentificationNumber).toBeDefined();
        expect(randomIdentificationNumber).toBeInstanceOf(IdentifiationNumber);
    });

});