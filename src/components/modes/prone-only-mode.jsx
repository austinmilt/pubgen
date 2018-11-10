import React from 'react'
import Mode from './_mode'

export default class ProneOnlyMode extends React.Component {

    render() {
        return <Mode 
            displayName="Prone Only"
            description="Play the entire match in the prone position."
            rules={[
                "You may stand and run when outside of the circle, but must return to prone as soon as you enter it.",
                "No fighting or looting while not prone.",
                "Looting and fighting outside of the circle are allowed as long as you are prone.",
                "If the game forces you out of prone (e.g. from a fall), you must return to prone as soon as possible."
            ]}
        />;
    }
}