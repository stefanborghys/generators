import React from "react";
import PropTypes from "prop-types";

class IdentificationNumberLabel extends React.Component {

    render() {
        return (<label>{this.props.identificationNumber.toString()}</label>);
    }
}

IdentificationNumberLabel.propTypes = {
    identificationNumber: PropTypes.object.isRequired
}

export default IdentificationNumberLabel;