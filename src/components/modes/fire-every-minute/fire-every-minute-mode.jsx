import React from 'react'
import Mode from '../_mode'
import CyclicTimer from './cyclic-timer';
import LocalAudio from './local-audio';
import NOTIFICATION_SOURCE from '../../../resources/sounds/notification.mp3';

export default class FireEveryMinuteMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notify: false
        };
    }


    notify = () => {
        this.setState({notify: true});
    }


    resetNotify = () => {
        this.setState({notify: false});
    }

    render() {
        return <Mode 
            displayName="Fire Every Minute"
            description="Fire you weapon every minute."
            rules={[
                "If you have a gun with ammo, you must fire it every minute."
            ]}
            advancedFeature={
                <div>
                    <CyclicTimer cycleSeconds={60} updateRate={250} onZero={this.notify}/>
                    <LocalAudio source={NOTIFICATION_SOURCE} playStartCallback={this.resetNotify} playWhen={this.state.notify}/>
                </div>
            }
        />;
    }
}