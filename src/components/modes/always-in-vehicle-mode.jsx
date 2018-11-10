import React from 'react'
import Mode from './_mode'

export default class AlwaysInVehicleMode extends React.Component {

    render() {
        return <Mode 
            displayName="Always in Vehicle"
            description="Play the entire match from a vehicle."
            rules={[
                "You must immediately seek out a vehicle upon landing.",
                "You may loot, but you must be within 3 steps of your vehicle at all times.",
                "You must be in a vehicle to fight.",
                "If your vehicle runs out of gas, explodes, or gets stuck (and you do not wish to use it for allowed purposes), you must find another vehicle before continuing."
            ]}
        />;
    }
}