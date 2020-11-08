import {isNil, isString} from "lodash";

const ISO639_1_REGEXP = new RegExp('[a-z]{2}$');

class Language {

    constructor(iso639_1, nativeName) {
        this._iso639_1 = Language.validIso639_1(iso639_1);
        this._nativeName = nativeName;
    }

    get iso639_1() {
        return this._iso639_1;
    }

    get nativeName() {
        return this._nativeName;
    }

    static validIso639_1(iso639_1) {
        if (isNil(iso639_1)) {
            throw new Error("The ISO 639-1 code cannot be 'null' or 'undefined'.");
        } else if (!isString(iso639_1)) {
            throw new Error("ISO 639-1 '" + iso639_1 + "' should of type 'String'.");
        } else if (!ISO639_1_REGEXP.test(iso639_1)) {
            throw new Error("Invalid ISO 639-1 code format '" + iso639_1 + "'.");
        } else {
            return iso639_1;
        }
    }

}

const ISO_639_1_DE = 'de';
const ISO_639_1_EN = 'en';
const ISO_639_1_FR = 'fr';
const ISO_639_1_NL = 'nl';
const ISO_639_1_WA = 'wa';

const DUTCH = new Language(ISO_639_1_NL, 'Nederlands');
const ENGLISH = new Language(ISO_639_1_EN, 'English');
const FLEMISH = new Language(ISO_639_1_NL, 'Vlaams');
const FRENCH = new Language(ISO_639_1_FR, 'Français');
const GERMAN = new Language(ISO_639_1_DE, 'Deutsch');
const WALLOON = new Language(ISO_639_1_WA, 'Walon');

export {
    DUTCH, FLEMISH, FRENCH, WALLOON, GERMAN, ENGLISH
};


