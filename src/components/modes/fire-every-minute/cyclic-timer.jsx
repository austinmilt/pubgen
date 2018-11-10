import React from 'react';
import { isNull } from 'util';

const clockStyle = {
    color: '#17D4FE',
    fontSize: '60px',
    fontFamily: 'Orbitron',
    letterSpacing: '7px',
    cursor: 'pointer',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none'
};

const CLOCK_STRING = "Click to Start";
const CLOCK_UNSTARTED_VALUE = -1000;

let timeout = null; //timeout function for updating the clock

export default class CyclicTimer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cycleSeconds: this.props.cycleSeconds,
            clockString: CLOCK_STRING,
            startTime: CLOCK_UNSTARTED_VALUE,
        };
    }


    setCycleSeconds = (cycleSeconds) => {
        this.setState({cycleSeconds: cycleSeconds});
    }


    resetClock = () => {
        this.setState({
            clockString: CLOCK_STRING,
            startTime: CLOCK_UNSTARTED_VALUE
        })
    }


    getRemainingHMS = (totalSeconds) => {
        let remainder = totalSeconds;
        let hours = Math.floor(this.state.cycleSeconds / 3600.0);
        remainder -= (hours*3600.0);
        let minutes = Math.floor(remainder/60.0);
        remainder -= (minutes*60.0);
        let seconds = Math.ceil(remainder);
        return {hours: hours, minutes: minutes, seconds: seconds};
    }


    padTimeUnit(timeUnit) {
        if (timeUnit < 10) { return "0" + timeUnit; }
        else { return "" + timeUnit; }
    }


    formatClockString = (hours, minutes, seconds) => {
        // let hourString = this.padTimeUnit(hours);
        let minuteString = this.padTimeUnit(minutes);
        let secondString = this.padTimeUnit(seconds);
        return `${minuteString}:${secondString}`; //not showing hours
        // return `${hourString}:${minuteString}:${secondString}`;
    }
    

    cycleTimer = () => {

        // reset the timer and do the zero-count action if we got to zero
        let timeSinceStart = (Date.now() - this.state.startTime)/1000;
        let remainingTime = this.state.cycleSeconds - timeSinceStart;
        if (remainingTime < 0) {
            if (this.state.startTime > 0) { this.props.onZero(); } // dont fire the zero action immediately
            remainingTime = this.state.cycleSeconds;
            this.setState({startTime: Date.now()}); // reset the start time to now to refresh the countdown
        }

        // format the clock
        let hms = this.getRemainingHMS(remainingTime);
        this.setState({
            clockString: this.formatClockString(hms['hours'], hms['minutes'], hms['seconds'])
        });

        // set up the next call
        timeout = setTimeout(this.cycleTimer, this.props.updateRate); //TODO this continues to get called after the component loses focus in the page
    }


    stopCycle = () => {
        clearTimeout(timeout);
        timeout = null;
        this.resetClock();
    }


    onClick = () => {
        if (isNull(timeout)) {
            this.cycleTimer(this.state.cycleSeconds);
        }
        else {
            this.stopCycle();
        }
    }


    componentWillUnmount = () => {
        this.stopCycle();
    }


    render() {
        return <div style={clockStyle} onClick={this.onClick}>{this.state.clockString}</div>;
    }
}