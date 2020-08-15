import React from "react";

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
        const state = this.state;
        const number = state.number;
        if (number === 1) {
            this.setState({
                number: this.props.number
            });
        } else {
            this.setState({
                number: state.number - 1
            });
        }

    }

    render() {
        return (<span>{this.state.number}</span>);
    }
}

export default CountDown;