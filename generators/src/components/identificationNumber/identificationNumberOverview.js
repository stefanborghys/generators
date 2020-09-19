import React from "react";
import AntdIdentificationNumberCalculator from "./antdIdentificationNumberCalculator";
import IdentificationNumberLabel from "./identificationNumberLabel";
import CopyToClipboard from "../clipboard/copyToClipboard";
import IdentifiationNumber from "../../model/identificationNumber/identifiationNumber";
import IdentificationNumberGenerator from "../../model/identificationNumber/identificationNumberGenerator";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedo} from '@fortawesome/free-solid-svg-icons';
import {Button, Card, Tooltip} from 'antd';

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
        return (<Card title="Identification Number" size="small" style={{width: 400}}
                      actions={[<Tooltip title="Generate">
                          <Button type="primary" shape="circle" size='small' onClick={this.handleGenerateIdentificationNumber}
                                  icon={<FontAwesomeIcon icon={faRedo}/>}/>
                      </Tooltip>, <IdentificationNumberLabel identificationNumber={identificationNumber}/>,
                          <CopyToClipboard value={identificationNumber.toString()}/>]}>
            <AntdIdentificationNumberCalculator identificationNumber={identificationNumber}
                                                onChange={this.handleIdentificationNumberChange}/>
        </Card>);
    }

}

export default IdentificationNumberOverview;