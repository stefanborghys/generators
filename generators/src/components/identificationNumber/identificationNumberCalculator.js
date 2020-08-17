import React from "react";
import IdentificationNumber from "./identificationNumber";

class IdentificationNumberCalculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateOfBirth: this.dateToStringFormat(new Date()),
            maxDateOfBirth: this.dateToStringFormat(new Date()),
            gender: 'MALE',
            serialNumber: 1,
            minSerialNumber: 1,
            maxSerialNumber: 997
        }
        this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleSerialNumber = this.handleSerialNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    now() {
        return this.dateToString(Date.now());
    }

    dateToStringFormat(date) {
        const month = date.getMonth() + 1;
        const m = month < 10 ? "0" + month : month;

        const day = date.getDate();
        const d = day < 10 ? "0" + day : day;

        return date.getFullYear() + "-" + m + "-" + d;
    }

    handleDateOfBirth(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleGender(event) {
        this.setState({
            [event.target.name]: event.target.value,
            serialNumber: event.target.value === 'MALE' ? 1 : 2,
            minSerialNumber: event.target.value === 'MALE' ? 1 : 2,
            maxSerialNumber: event.target.value === 'MALE' ? 997 : 998
        });
    }

    handleSerialNumber(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
    }

    render() {
        return (<div>
            <form>
                <fieldset>
                    <legend>Identification Number</legend>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type="date" name="dateOfBirth" id="dateOfBirth" value={this.state.dateOfBirth} max={this.state.maxDateOfBirth}
                           onChange={this.handleDateOfBirth} required/>
                    <br/>
                    <br/>
                    <label>Gender:</label>
                    <input type="radio" name="gender" id="male" value="MALE" checked={this.state.gender === 'MALE'} onChange={this.handleGender}/>
                    <label htmlFor="male">male</label>
                    <input type="radio" name="gender" id="female" value="FEMALE" checked={this.state.gender === 'FEMALE'}
                           onChange={this.handleGender}/>
                    <label htmlFor="female">female</label>
                    <br/>
                    <br/>
                    <label htmlFor="serialNumber">Serial number:</label>
                    <input type="number" name="serialNumber" id="serialNumber" value={this.state.serialNumber} min={this.state.minSerialNumber}
                           max={this.state.maxSerialNumber} step={2} size={3} onChange={this.handleSerialNumber} required/>
                    <br/>
                    <br/>
                    <input type="submit" value="Calculate"/>
                </fieldset>
            </form>
            <IdentificationNumber dateOfBirth={new Date(this.state.dateOfBirth)} serialNumber={this.state.serialNumber}/>
        </div>);
    }

}

export default IdentificationNumberCalculator;