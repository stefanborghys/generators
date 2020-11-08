import React from "react";
import copy from "copy-to-clipboard";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {Button, Tooltip} from 'antd';
import {withTranslation} from "react-i18next";

class CopyToClipboard extends React.Component {

    constructor(props) {
        super(props);
        this.handleCopy = this.handleCopy.bind(this);
    }

    handleCopy() {
        copy(this.props.value);
    }

    render() {
        const t = this.props.t;
        return (<Tooltip title={t('copyToClipboard:name')}>
            <Button type="primary" shape="circle" size='small' onClick={this.handleCopy} icon={<FontAwesomeIcon icon={faCopy}/>}/>
        </Tooltip>);
    }

}

CopyToClipboard.propTypes = {
    value: PropTypes.string.isRequired
}

export default withTranslation()(CopyToClipboard);