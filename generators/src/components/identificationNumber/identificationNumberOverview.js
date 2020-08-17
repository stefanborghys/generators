import React from "react";
import IdentificationNumberGenerator from "./identificationNumberGenerator";
import IdentificationNumberCalculator from "./identificationNumberCalculator";

class IdentificationNumberOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            generate: true,
            calculate: false
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState(state => ({
            generate: !state.generate,
            calculate: !state.calculate
        }));
    }

    render() {
        const generate = this.state.generate;
        return (<div>
            <button onClick={this.handleToggle} disabled={generate}>Generate</button>
            <button onClick={this.handleToggle} disabled={!generate}>Calculate</button>
            {generate ? <IdentificationNumberGenerator/> : <IdentificationNumberCalculator/>}
        </div>);
    }

}

export default IdentificationNumberOverview;