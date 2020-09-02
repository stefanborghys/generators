import _ from 'lodash';

class Gender {

    static isMale(gender) {
        return gender === MALE;
    }

    static isFemale(gender) {
        return gender === FEMALE;
    }

    static validGender(gender) {
        if (_.isNil(gender)) {
            throw new Error("Gender cannot be 'null' or 'undefined'.");
        } else if (!_.isString(gender)) {
            throw new Error("Gender '" + gender + "' should of type 'String'.");
        } else if (gender !== MALE && gender !== FEMALE) {
            throw new Error("Gender '" + gender + "' should be one of '" + [MALE, FEMALE] + "'.");
        } else {
            return gender;
        }
    }

}

const MALE = 'MALE', FEMALE = 'FEMALE';

export {
    MALE, FEMALE, Gender
};