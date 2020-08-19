import React from "react";
import IdentificationNumberGenerator from "./identificationNumberGenerator";
import IdentificationNumberCalculator from "./identificationNumberCalculator";
import IdentificationNumber from "./identificationNumber";

class IdentificationNumberOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateOfBirth: new Date(),
            serialNumber: 1
        };
        this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);
        this.handleSerialNumberChange = this.handleSerialNumberChange.bind(this);
        this.handleIdentificationNumberChange = this.handleIdentificationNumberChange.bind(this);
    }

    handleDateOfBirthChange(dateOfBirth) {
        this.setState({dateOfBirth: dateOfBirth});
    }

    handleSerialNumberChange(serialNumber) {
        this.setState({serialNumber: serialNumber});
    }

    handleIdentificationNumberChange(generatedIdentificationNumber) {
        this.setState(generatedIdentificationNumber);
    }

    render() {
        const dateOfBirth = this.state.dateOfBirth;
        const serialNumber = this.state.serialNumber;
        return (<div>
            <IdentificationNumberGenerator onIdentificationNumberChange={this.handleIdentificationNumberChange}/>
            <IdentificationNumberCalculator dateOfBirth={dateOfBirth}
                                            onDateOfBirthChange={this.handleDateOfBirthChange}
                                            serialNumber={serialNumber}
                                            onSerialNumberChange={this.handleSerialNumberChange}/>
            <IdentificationNumber dateOfBirth={dateOfBirth} serialNumber={serialNumber}/>
        </div>);
    }

}

export default IdentificationNumberOverview;