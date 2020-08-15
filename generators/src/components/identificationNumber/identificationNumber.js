import React from "react";

class IdentificationNumber extends React.Component {

    constructor(props) {
        super(props);
    }

    firstGroup(dateOfBirth) {
        const year = dateOfBirth.getFullYear();
        const yearOfBirth = year.toString().slice(2);

        const month = dateOfBirth.getMonth() + 1;
        const monthOfBirth = month < 10 ? "0" + month : month;

        const date = dateOfBirth.getDate();
        const birthday = date < 10 ? "0" + date : date;

        return yearOfBirth + "." + monthOfBirth + "." + birthday;
    }

    secondGroup(serialNumber) {
        if (serialNumber < 10) {
            return "00" + serialNumber;
        } else if (serialNumber < 100) {
            return "0" + serialNumber;
        } else {
            return serialNumber;
        }
    }

    render() {
        return (<label>{this.firstGroup(this.props.dateOfBirth)}-{this.secondGroup(this.props.serialNumber)}</label>);
    }
}

export default IdentificationNumber;