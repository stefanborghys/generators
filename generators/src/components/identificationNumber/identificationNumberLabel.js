import React from "react";

class IdentificationNumberLabel extends React.Component {

    render() {
        return (<label>{this.props.identificationNumber.toString()}</label>);
    }
}

export default IdentificationNumberLabel;