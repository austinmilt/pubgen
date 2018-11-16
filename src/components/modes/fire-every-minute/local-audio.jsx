import React from 'react';
import PropTypes from 'prop-types';

export default class LocalAudio extends React.Component {

    constructor(props) {
        super(props);
        this.audio = React.createRef();
    }


    componentDidUpdate(props) {
        if (this.props.playWhen) {
            this.play();
        }
    }


    play = () => {
        this.audio.current.play();
        if (this.props.playStartCallback) {
            this.props.playStartCallback();
        }
    }


    render() {
        return <audio ref={this.audio}>
            <source src={this.props.source} type="audio/mp3"/>
            <p>Your browser doesn't support HTML5 audio. No audio will play.</p> 
        </audio>;
    }
}

LocalAudio.propTypes = {
    playWhen: PropTypes.bool.isRequired,
    playStartCallback: PropTypes.func,
    source: PropTypes.string.isRequired
};