import React from "react";
import IdentifiationNumber from "./identifiationNumber";

class IdentificationNumberGenerator extends React.Component {

    constructor(props) {
        super(props);
        this.handleGenerateIdentificationNumber = this.handleGenerateIdentificationNumber.bind(this);
    }

    randomNumberBetween(minIncl, maxIncl) {
        return Math.floor(Math.random() * (maxIncl - minIncl + 1)) + minIncl;
    }

    handleGenerateIdentificationNumber() {
        const dateOfBirth = new Date(this.randomNumberBetween(0, new Date().getTime()));
        const serialNumber = this.randomNumberBetween(1, 998);
        this.props.onChange(new IdentifiationNumber(dateOfBirth, serialNumber));
    }

    render() {
        return (<button onClick={this.handleGenerateIdentificationNumber}>Generate</button>);
    }
}

export default IdentificationNumberGenerator;