import React from "react";
import IdentificationNumber from "./identificationNumber";
import CountDown from "./countDown";

class IdentificationNumberGenerator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateOfBirth: this.randomDateOfBirth(),
            serialNumber: this.randomSerialNumber()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.randomizeData(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    randomDateOfBirth() {
        return new Date(this.randomNumberBetween(0, new Date().getTime()));
    }

    randomSerialNumber() {
        return this.randomNumberBetween(1, 998);
    }

    randomNumberBetween(minIncl, maxIncl) {
        return Math.floor(Math.random() * (maxIncl - minIncl + 1)) + minIncl;
    }

    randomizeData() {
        this.setState({
            dateOfBirth: this.randomDateOfBirth(),
            serialNumber: this.randomSerialNumber()
        });
    }

    render() {
        return (<div>
            <CountDown number={10}/> : <IdentificationNumber dateOfBirth={this.state.dateOfBirth}
                                                             serialNumber={this.state.serialNumber}/>
        </div>);
    }
}

export default IdentificationNumberGenerator;