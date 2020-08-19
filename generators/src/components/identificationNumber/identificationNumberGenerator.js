import React from "react";
import CountDown from "./countDown";

class IdentificationNumberGenerator extends React.Component {

    constructor(props) {
        super(props);
        this.handleGenerateIdentificationNumber = this.handleGenerateIdentificationNumber.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.handleGenerateIdentificationNumber(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    randomNumberBetween(minIncl, maxIncl) {
        return Math.floor(Math.random() * (maxIncl - minIncl + 1)) + minIncl;
    }

    handleGenerateIdentificationNumber() {
        const dateOfBirth = new Date(this.randomNumberBetween(0, new Date().getTime()));
        const serialNumber = this.randomNumberBetween(1, 998);
        this.props.onIdentificationNumberChange({
            dateOfBirth: dateOfBirth,
            serialNumber: serialNumber
        });
    }

    render() {
        return (<div>
            <CountDown number={10}/>
            <button onClick={this.handleGenerateIdentificationNumber}>Generate</button>
        </div>);
    }
}

export default IdentificationNumberGenerator;