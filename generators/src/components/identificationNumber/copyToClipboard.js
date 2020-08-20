import React from "react";
import copy from "copy-to-clipboard";

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

export default CopyToClipboard;