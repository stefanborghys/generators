import React from "react";
import IdentificationNumberGenerator from "./identificationNumberGenerator";
import AntdIdentificationNumberCalculator from "./antdIdentificationNumberCalculator";
import IdentificationNumberLabel from "./identificationNumberLabel";
import CopyToClipboard from "../clipboard/copyToClipboard";
import IdentifiationNumber from "../../model/identificationNumber/identifiationNumber";

class IdentificationNumberOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identificationNumber: new IdentifiationNumber()
        };
        this.handleIdentificationNumberChange = this.handleIdentificationNumberChange.bind(this);
    }

    handleIdentificationNumberChange(identificationNumber) {
        this.setState({identificationNumber});
    }

    render() {
        const identificationNumber = this.state.identificationNumber;
        return (<div>
            <AntdIdentificationNumberCalculator identificationNumber={identificationNumber}
                                                onChange={this.handleIdentificationNumberChange}/>
            <IdentificationNumberGenerator onChange={this.handleIdentificationNumberChange}/>
            <IdentificationNumberLabel identificationNumber={identificationNumber}/>
            <CopyToClipboard value={identificationNumber.toString()}/>
        </div>);
    }

}

export default IdentificationNumberOverview;

// <IdentificationNumberCalculator identificationNumber={identificationNumber}
//                                            onChange={this.handleIdentificationNumberChange}/>