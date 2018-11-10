import React from 'react'
import Mode from './_mode'

export default class NormalMode extends React.Component {

    render() {
        return <Mode 
            displayName="Normal"
            description="It's normal PUBG. Try to have fun I guess."
            rules={[]}
        />;
    }
}