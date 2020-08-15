import React from 'react';
import logo from './logo.svg';
import './App.css';
import IdentificationNumberGenerator from "./components/identificationNumber/identificationNumberGenerator";

function App() {
    return (<div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <IdentificationNumberGenerator/>
        </header>
    </div>);
}

export default App;
