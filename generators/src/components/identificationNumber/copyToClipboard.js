import React from "react";
import copy from "copy-to-clipboard";
import PropTypes from "prop-types";

class CopyToClipboard extends React.Component {

    constructor(props) {
        super(props);
        this.handleCopy = this.handleCopy.bind(this);
    }

    handleCopy() {
        copy(this.props.value);
    }

    render() {
        return (<button onClick={this.handleCopy}>Copy to Clipboard</button>);
    }

}

CopyToClipboard.propTypes = {
    value: PropTypes.string.isRequired
}

export default CopyToClipboard;