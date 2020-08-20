import React from "react";
import IdentifiationNumber from "./identifiationNumber";
import moment from 'moment';

class IdentificationNumberCalculator extends React.Component {

    constructor(props) {
        super(props);
        const identificationNumber = this.props.identificationNumber;
        const gender = identificationNumber.gender;
        this.state = {
            maxDateOfBirthMoment: moment(),
            gender: gender,
            minSerialNumber: this.getMinSerialNumber(gender),
            maxSerialNumber: this.getMaxSerialNumber(gender),
            dateOfBirth: identificationNumber.dateOfBirth,
            serialNumber: identificationNumber.serialNumber
        }
        this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleSerialNumber = this.handleSerialNumber.bind(this);
    }

    handleDateOfBirth(event) {
        this.setState({dateOfBirth: new Date(event.target.value)})
        this.handleIdentificationNumberChange();
    }

    isMale(gender) {
        return gender === 'MALE';
    }

    isFemale(gender) {
        return gender === 'FEMALE';
    }

    getMinSerialNumber(gender) {
        return this.isMale(gender) ? 1 : 2;
    }

    getMaxSerialNumber(gender) {
        return this.isMale(gender) ? 997 : 998;
    }

    handleGender(event) {
        const gender = event.target.value;
        const minSerialNumber = this.getMinSerialNumber(gender);
        this.setState({
            gender: gender,
            minSerialNumber: minSerialNumber,
            maxSerialNumber: this.getMaxSerialNumber(gender),
            serialNumber: minSerialNumber
        });
        this.handleIdentificationNumberChange();
    }

    handleSerialNumber(event) {
        this.setState({serialNumber: parseInt(event.target.value)})
        this.handleIdentificationNumberChange();
    }

    handleIdentificationNumberChange() {
        this.props.onChange(new IdentifiationNumber(this.state.dateOfBirth, this.state.serialNumber));
    }

    render() {
        const identifiationNumber = this.props.identificationNumber;
        const dateOfBirth = identifiationNumber.dateOfBirthMoment.format("YYYY-MM-DD");
        const maxDateOfBirth = this.state.maxDateOfBirthMoment.format("YYYY-MM-DD");

        const gender = identifiationNumber.gender;
        const minSerialNumber = this.getMinSerialNumber(gender);
        const maxSerialNumber = this.getMaxSerialNumber(gender);

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
                       value="MALE"
                       checked={this.isMale(gender)}
                       onChange={this.handleGender}/>
                <label htmlFor="male">male</label>
                <input type="radio" name="gender" id="female"
                       value="FEMALE"
                       checked={this.isFemale(gender)}
                       onChange={this.handleGender}/>
                <label htmlFor="female">female</label>
                <br/>
                <br/>
                <label htmlFor="serialNumber">Serial number:</label>
                <input type="number" name="serialNumber" id="serialNumber"
                       value={identifiationNumber.serialNumber}
                       min={minSerialNumber} max={maxSerialNumber}
                       step={2} size={3}
                       onChange={this.handleSerialNumber} required/>
            </fieldset>
        </form>);
    }

}

export default IdentificationNumberCalculator;