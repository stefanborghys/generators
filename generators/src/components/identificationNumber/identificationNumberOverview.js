import React from "react";
import IdentificationNumberGenerator from "./identificationNumberGenerator";
import IdentificationNumberCalculator from "./identificationNumberCalculator";
import IdentificationNumberLabel from "./identificationNumberLabel";
import CopyToClipboard from "./copyToClipboard";
import IdentifiationNumber from "./identifiationNumber";

class IdentificationNumberOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identificationNumber: new IdentifiationNumber(new Date(), 1)
        };
        this.handleIdentificationNumberChange = this.handleIdentificationNumberChange.bind(this);
    }

    handleIdentificationNumberChange(identificationNumber) {
        this.setState({identificationNumber: identificationNumber});
    }

    render() {
        const identificationNumber = this.state.identificationNumber;
        return (<div>
            <IdentificationNumberCalculator identificationNumber={identificationNumber}
                                            onChange={this.handleIdentificationNumberChange}/>
            <IdentificationNumberGenerator onChange={this.handleIdentificationNumberChange}/>
            <IdentificationNumberLabel identificationNumber={identificationNumber}/>
            <CopyToClipboard value={identificationNumber.toString()}/>
        </div>);
    }

}

export default IdentificationNumberOverview;