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
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(state => ({
            generate: !state.generate,
            calculate: !state.calculate
        }));
    }

    render() {
        const generate = this.state.generate;
        return (<div>
            <button onClick={this.toggle} disabled={generate}>Generate</button>
            <button onClick={this.toggle} disabled={!generate}>Calculate</button>
            {generate ? <IdentificationNumberGenerator/> : <IdentificationNumberCalculator/>}
        </div>);
    }

}

export default IdentificationNumberOverview;