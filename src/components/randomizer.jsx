import React from 'react';
import Button from './interactives/button';
import FirstGunMode from '../components/modes/first-gun-mode';
import ProneOnlyMode from '../components/modes/prone-only-mode';
import DestroyAllMode from './modes/destroy-all-mode';
import AlwaysInVehicleMode from './modes/always-in-vehicle-mode';
import NormalMode from './modes/normal-mode';
import LootTheDeadMode from './modes/loot-the-dead-mode';
import FireFromPositionMode from './modes/fire-from-position-mode';
import OneClassMode from './modes/one-class/one-class-mode';
import FireEveryMinuteMode from './modes/fire-every-minute/fire-every-minute-mode';

const CYCLE_MODES = true;

const MODES = [
    FirstGunMode, ProneOnlyMode, DestroyAllMode, AlwaysInVehicleMode, 
    NormalMode, LootTheDeadMode, FireFromPositionMode, OneClassMode,
    FireEveryMinuteMode
];


export default class Randomizer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeMode: null,
            modeIndex: 0
        };
    }


    chooseRandomMode = () => { //necessary to use the () => {} format in order to bind to "this"
        return MODES[Math.floor(Math.random()*MODES.length)];
    }


    chooseNextMode = () => {
        const mode = MODES[this.state.modeIndex];
        const nextIndex = (this.state.modeIndex + 1) % MODES.length;
        this.setState({modeIndex: nextIndex});
        return mode;
    }


    activateRandomMode = () => {
        let ActiveMode;
        if (CYCLE_MODES) {
            ActiveMode = this.chooseNextMode();
            const nextIndex = (this.state.modeIndex + 1) % MODES.length;
            console.log("Current mode is " + ActiveMode.name + ". Next mode is " + MODES[nextIndex].name);
        }
        else {
            ActiveMode = this.chooseRandomMode(); //must create a temporary "mode" that takes from our known modes
        }
        this.setState({activeMode: <ActiveMode/>});
    }


    render() {
        return <div>
            <Button buttonText="Hit It!" onClick={this.activateRandomMode}/>
            <div>
                {this.state.activeMode}
            </div>
        </div>;
    }
}