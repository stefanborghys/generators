import React from "react";
import PropTypes from "prop-types";

class CountDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: props.number
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.countDown(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    countDown() {
        this.setState((state, props) => ({
            number: state.number === 1 ? props.number : state.number - 1
        }));
    }

    render() {
        const number = this.state.number;
        return (<span>{number}</span>);
    }
}

CountDown.propTypes = {
    number: PropTypes.number.isRequired
}

export default CountDown;