class Gender {

    static isMale(gender) {
        return gender === MALE;
    }

    static isFemale(gender) {
        return gender === FEMALE;
    }

}

const MALE = 'MALE', FEMALE = 'FEMALE';

export {
    MALE, FEMALE, Gender
};