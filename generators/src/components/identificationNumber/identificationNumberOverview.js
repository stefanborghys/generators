import React from "react";
import AntdIdentificationNumberCalculator from "./antdIdentificationNumberCalculator";
import IdentificationNumberLabel from "./identificationNumberLabel";
import CopyToClipboard from "../clipboard/copyToClipboard";
import IdentifiationNumber from "../../model/identificationNumber/identifiationNumber";
import IdentificationNumberGenerator from "../../model/identificationNumber/identificationNumberGenerator";

class IdentificationNumberOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identificationNumber: new IdentifiationNumber()
        };
        this.handleIdentificationNumberChange = this.handleIdentificationNumberChange.bind(this);
        this.handleGenerateIdentificationNumber = this.handleGenerateIdentificationNumber.bind(this);
    }

    handleIdentificationNumberChange(identificationNumber) {
        this.setState({identificationNumber});
    }

    handleGenerateIdentificationNumber() {
        this.setState({identificationNumber: IdentificationNumberGenerator.random()});
    }

    render() {
        const identificationNumber = this.state.identificationNumber;
        return (<div>
            <AntdIdentificationNumberCalculator identificationNumber={identificationNumber}
                                                onChange={this.handleIdentificationNumberChange}/>
            <button onClick={this.handleGenerateIdentificationNumber}>Generate</button>
            <IdentificationNumberLabel identificationNumber={identificationNumber}/>
            <CopyToClipboard value={identificationNumber.toString()}/>
        </div>);
    }

}

export default IdentificationNumberOverview;