import React from 'react'
import Mode from './_mode'

export default class FirstGunMode extends React.Component {

    render() {
        return <Mode 
            displayName="First Gun"
            description="The first gun you see is the only gun you can use."
            rules={[
                "You must pick up and use the first gun you see in the match.",
                "Melee weapons and grenades are allowed, and don't count as your only 'gun'."
            ]}
        />;
    }
}