import IdentifiationNumber from "./identifiationNumber";

class IdentificationNumberGenerator {

    static randomNumberBetween(minIncl, maxIncl) {
        return Math.floor(Math.random() * (maxIncl - minIncl + 1)) + minIncl;
    }

    static random() {
        const dateOfBirth = new Date(IdentificationNumberGenerator.randomNumberBetween(0, new Date().getTime()));
        const serialNumber = IdentificationNumberGenerator.randomNumberBetween(1, 998);
        return new IdentifiationNumber(dateOfBirth, serialNumber);
    }

}

export default IdentificationNumberGenerator;