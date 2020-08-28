import React from "react";
import moment from 'moment';
import {MALE, FEMALE, Gender} from "./gender";
import SerialNumberConfiguration from "./serialNumberConfiguration";

class IdentificationNumberCalculator extends React.Component {

    constructor(props) {
        super(props);
        const identificationNumber = this.props.identificationNumber.clone();
        this.state = {
            maxDateOfBirthMoment: moment(),
            serialNumberConfiguration: SerialNumberConfiguration.ofGender(identificationNumber.gender),
            identificationNumber: identificationNumber
        }
        this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleSerialNumber = this.handleSerialNumber.bind(this);
    }

    handleDateOfBirth(event) {
        const identificationNumber = this.state.identificationNumber;
        identificationNumber.dateOfBirth = new Date(event.target.value);

        this.handleIdentificationNumberChange(identificationNumber);
    }

    handleGender(event) {
        const serialNumberConfiguration = SerialNumberConfiguration.ofGender(event.target.value);

        const identificationNumber = this.state.identificationNumber;
        identificationNumber.serialNumber = serialNumberConfiguration.minimum;

        this.setState({serialNumberConfiguration});
        this.handleIdentificationNumberChange(identificationNumber);
    }

    handleSerialNumber(event) {
        const identificationNumber = this.state.identificationNumber;
        identificationNumber.serialNumber = parseInt(event.target.value);

        this.handleIdentificationNumberChange(identificationNumber);
    }

    handleIdentificationNumberChange(identificationNumber) {
        this.setState({identificationNumber});
        this.props.onChange(identificationNumber);
    }

    render() {
        const identificationNumber = this.props.identificationNumber;

        const dateOfBirth = identificationNumber.dateOfBirthMoment.format("YYYY-MM-DD");
        const maxDateOfBirth = this.state.maxDateOfBirthMoment.format("YYYY-MM-DD");

        const gender = identificationNumber.gender;
        const serialNumberConfiguration = this.state.serialNumberConfiguration;

        return (<form>
            <fieldset>
                <legend>Identification Number</legend>
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input type="date" name="dateOfBirth" id="dateOfBirth"
                       value={dateOfBirth}
                       max={maxDateOfBirth}
                       onChange={this.handleDateOfBirth} required/>
                <br/>
                <br/>
                <label>Gender:</label>
                <input type="radio" name="gender" id="male"
                       value={MALE}
                       checked={Gender.isMale(gender)}
                       onChange={this.handleGender}/>
                <label htmlFor="male">male</label>
                <input type="radio" name="gender" id="female"
                       value={FEMALE}
                       checked={Gender.isFemale(gender)}
                       onChange={this.handleGender}/>
                <label htmlFor="female">female</label>
                <br/>
                <br/>
                <label htmlFor="serialNumber">Serial number:</label>
                <input type="number" name="serialNumber" id="serialNumber"
                       value={identificationNumber.serialNumber}
                       min={serialNumberConfiguration.minimum} max={serialNumberConfiguration.maximum}
                       step={2} size={3}
                       onChange={this.handleSerialNumber} required/>
            </fieldset>
        </form>);
    }

}

export default IdentificationNumberCalculator;