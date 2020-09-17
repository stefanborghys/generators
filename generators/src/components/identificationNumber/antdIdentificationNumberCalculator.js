import React from "react";
import moment from 'moment';
import {FEMALE, MALE} from "../../model/person/gender";
import SerialNumberConfiguration from "../../model/identificationNumber/serialNumberConfiguration";
import PropTypes from "prop-types";
import {DatePicker, Form, InputNumber, Radio} from 'antd';
import 'antd/dist/antd.css';
import {isNil, isFinite} from 'lodash';

const dateFormat = 'DD/MM/YYYY';

class AntdIdentificationNumberCalculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxDateOfBirthMoment: moment()
        }
        this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
        this.isDisabledDateOfBirth = this.isDisabledDateOfBirth.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleSerialNumber = this.handleSerialNumber.bind(this);
    }

    handleDateOfBirth(momentOfBirth)
    {
        if (!isNil(momentOfBirth)) {
            const identificationNumber = this.props.identificationNumber.clone();
            identificationNumber.dateOfBirth = momentOfBirth.toDate();

            this.handleIdentificationNumberChange(identificationNumber);
        }
    }

    isDisabledDateOfBirth(moment) {
        return moment.isAfter(this.state.maxDateOfBirthMoment, 'day');
    }

    handleGender(event) {
        const identificationNumber = this.props.identificationNumber.clone();
        identificationNumber.serialNumber = SerialNumberConfiguration.ofGender(event.target.value).minimum;

        this.handleIdentificationNumberChange(identificationNumber);
    }

    handleSerialNumber(serialNumber) {
        if (isFinite(serialNumber)) {
            const identificationNumber = this.props.identificationNumber.clone();
            identificationNumber.serialNumber = serialNumber;

            this.handleIdentificationNumberChange(identificationNumber);
        }
    }

    handleIdentificationNumberChange(identificationNumber) {
        this.props.onChange(identificationNumber);
    }

    render() {
        const identificationNumber = this.props.identificationNumber;
        const serialNumberConfiguration = identificationNumber.serialNumberConfiguration;
        const fields = [{
            name: ['dateOfBirth'],
            value: moment(identificationNumber.dateOfBirth),
        }, {
            name: ['gender'],
            value: identificationNumber.gender,
        }, {
            name: ['serialNumber'],
            value: identificationNumber.serialNumber
        }];

        return (<Form name="identificationNumberCalculatorForm"
                      colon={false}
                      layout='horizontal'
                      labelAlign={'left'}
                      labelCol={{span: 2}}
                      wrapperCol={{span: 5}}
                      fields={fields}
                      size='small'>
            <legend>Identification Number</legend>
            <Form.Item label="Date of Birth" name="dateOfBirth"
                       rules={[{
                           required: true,
                           message: 'Please select a date of birth!'
                       }]}>
                <DatePicker onChange={this.handleDateOfBirth}
                            format={dateFormat}
                            disabledDate={this.isDisabledDateOfBirth}
                            allowClear={false}/>

            </Form.Item>
            <Form.Item label="Gender" name="gender"
                       rules={[{
                           required: true,
                           message: 'Please determine the gender!'
                       }]}>
                <Radio.Group onChange={this.handleGender} buttonStyle="solid">
                    <Radio.Button value={MALE}>male</Radio.Button>
                    <Radio.Button value={FEMALE}>female</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Serial number" name="serialNumber"
                       rules={[{
                           required: true,
                           message: 'Please provide a serial number!'
                       }]}>
                <InputNumber onChange={this.handleSerialNumber}
                             min={serialNumberConfiguration.minimum} max={serialNumberConfiguration.maximum}
                             step={2}/>
            </Form.Item>
        </Form>);
    }

}

AntdIdentificationNumberCalculator.propTypes = {
    identificationNumber: PropTypes.object.isRequired
}

export default AntdIdentificationNumberCalculator;