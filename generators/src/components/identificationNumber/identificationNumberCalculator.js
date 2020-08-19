import React from "react";

class IdentificationNumberCalculator extends React.Component {

    constructor(props) {
        super(props);
        const gender = this.getGenderBySerialNumber(props.serialNumber);
        this.state = {
            maxDateOfBirth: this.dateToStringFormat(new Date()),
            gender: gender,
            minSerialNumber: this.getMinSerialNumber(gender),
            maxSerialNumber: this.getMaxSerialNumber(gender)
        }
        this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleSerialNumber = this.handleSerialNumber.bind(this);
    }

    dateToStringFormat(date) {
        const month = date.getMonth() + 1;
        const m = month < 10 ? "0" + month : month;

        const day = date.getDate();
        const d = day < 10 ? "0" + day : day;

        return date.getFullYear() + "-" + m + "-" + d;
    }

    handleDateOfBirth(event) {
        this.props.onDateOfBirthChange(new Date(event.target.value));
    }

    isMale(gender) {
        return gender === 'MALE';
    }

    isFemale(gender) {
        return gender === 'FEMALE';
    }

    getGenderBySerialNumber(serialNumber) {
        return serialNumber % 2 === 0 ? 'FEMALE' : 'MALE';
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
            maxSerialNumber: this.getMaxSerialNumber(gender)
        });
        this.props.onSerialNumberChange(minSerialNumber);
    }

    handleSerialNumber(event) {
        this.props.onSerialNumberChange(parseInt(event.target.value));
    }

    render() {
        const dateOfBirth = this.dateToStringFormat(this.props.dateOfBirth);
        const maxDateOfBirth = this.state.maxDateOfBirth;
        const serialNumber = this.props.serialNumber;

        const gender = this.getGenderBySerialNumber(this.props.serialNumber);
        const minSerialNumber = this.getMinSerialNumber(gender);
        const maxSerialNumber = this.getMaxSerialNumber(gender);

        return (<div>
            <form>
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
                           value={serialNumber}
                           min={minSerialNumber} max={maxSerialNumber}
                           step={2} size={3}
                           onChange={this.handleSerialNumber} required/>
                </fieldset>
            </form>
        </div>);
    }

}

export default IdentificationNumberCalculator;