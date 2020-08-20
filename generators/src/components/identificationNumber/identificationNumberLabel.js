import React from "react";

class IdentificationNumberLabel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<label>{this.props.identificationNumber.toString()}</label>);
    }
}

export default IdentificationNumberLabel;