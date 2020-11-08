import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    //.use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        /*
        backend: {
            // for all available options read the backend's repository readme file
            loadPath: '/public/locales/{{lng}}/{{ns}}.json'
        },
         */
        lng: 'nl', // if set to 'cimode' the output text will be the key.
        fallbackLng: ['en'],
        languages: ['en'],
        supportedLngs: ['nl', 'en'], // array of allowed languages
        nonExplicitSupportedLngs: true, // if true will pass eg. en-US if finding en in supportedLngs
        load: 'languageOnly',
        cleanCode: true, // language will be lowercased EN --> en while leaving full locales like en-US
        ns: ['language', 'gender', 'copyToClipboard'],
        defaultNS: 'translation',
        debug: true,
        appendNamespaceToCIMode: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;