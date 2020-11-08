import React from "react";
import {Select} from 'antd';
import {getI18n} from "react-i18next";
import './languageSelector.css';
import {sortBy} from 'lodash';

class LanguageSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: getI18n().language,
            languageOptions: []
        };
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    componentDidMount() {
        /**
         * Enforce setting the language in state after the component is created!
         */
        getI18n().on("languageChanged", language => {
            this.setState({selectedLanguage: language});
        });

        /**
         * Filter the configured i18next supported languages on the 'cimode' occurrence.
         * Which is provide for e2e testing.
         *
         * src: https://www.i18next.com/how-to/faq
         */
        const supportedLanguages = getI18n().options.supportedLngs.filter(language => language !== 'cimode');

        const languageOptions = supportedLanguages.map(language => {
            const nativeName = getI18n().t("language:" + language + ".nativeName");
            return {
                value: language,
                label: nativeName,
                title: nativeName
            };
        });
        const sortedLanguageOptions = sortBy(languageOptions, ['label']);
        this.setState({languageOptions: sortedLanguageOptions});
    }

    handleLanguageChange(iso639_1) {
        getI18n().changeLanguage(iso639_1);
    }

    render() {
        const {languageOptions, selectedLanguage} = this.state;
        return <Select options={languageOptions} defaultValue={selectedLanguage} value={selectedLanguage} onChange={this.handleLanguageChange}
                       placeholder={"Language"} bordered={true}
                       size="small"
                       style={{width: 150}}>
        </Select>;
    }

}

export default LanguageSelector;