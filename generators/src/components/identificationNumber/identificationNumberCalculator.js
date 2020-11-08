import React from "react";
import moment from 'moment';
import {FEMALE, MALE} from "../../model/person/gender";
import SerialNumberConfiguration from "../../model/identificationNumber/serialNumberConfiguration";
import PropTypes from "prop-types";
import {DatePicker, Form, InputNumber, Radio} from 'antd';
import 'antd/dist/antd.css';
import {isFinite, isNil} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFemale, faMale} from '@fortawesome/free-solid-svg-icons';
import {withTranslation} from "react-i18next";
import './identificationNumberCalculator.css';

const dateFormat = 'DD/MM/YYYY';

class IdentificationNumberCalculator extends React.Component {

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

    handleDateOfBirth(momentOfBirth) {
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
        const {t, identificationNumber} = this.props;
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
                      labelCol={{span: 12}}
                      wrapperCol={{span: 12}}
                      fields={fields}
                      size='small'>
            <Form.Item label={t('identification-number.date-of-birth.name')} name="dateOfBirth"
                       rules={[{
                           required: true,
                           message: t('identification-number.date-of-birth.validation.required')
                       }]}>
                <DatePicker onChange={this.handleDateOfBirth}
                            format={dateFormat}
                            disabledDate={this.isDisabledDateOfBirth}
                            allowClear={false}/>

            </Form.Item>
            <Form.Item label={t('gender:name')} name="gender"
                       rules={[{
                           required: true,
                           message: t('gender:validation.required')
                       }]}>
                <Radio.Group onChange={this.handleGender} buttonStyle="solid">
                    <Radio.Button value={MALE}>
                        <span className="gender-option">{t('gender:options.' + MALE)}</span>
                        <FontAwesomeIcon icon={faMale}/>
                    </Radio.Button>
                    <Radio.Button value={FEMALE}>
                        <span className="gender-option">{t('gender:options.' + FEMALE)}</span>
                        <FontAwesomeIcon icon={faFemale}/>
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label={t('identification-number.serial-number.name')} name="serialNumber"
                       rules={[{
                           required: true,
                           message: t('identification-number.serial-number.validation.required')
                       }]}>
                <InputNumber onChange={this.handleSerialNumber}
                             min={serialNumberConfiguration.minimum} max={serialNumberConfiguration.maximum}
                             step={2}/>
            </Form.Item>
        </Form>);
    }

}

IdentificationNumberCalculator.propTypes = {
    identificationNumber: PropTypes.object.isRequired
}

export default withTranslation()(IdentificationNumberCalculator);