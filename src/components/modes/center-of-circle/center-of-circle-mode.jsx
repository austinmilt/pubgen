import React from 'react'
import Mode from '../_mode'

export default class CenterOfCircleMode extends React.Component {

    render() {
        return <Mode 
            displayName="Center of Circle"
            description="You must always be near (or moving to) the center of the circle."
            rules={[
                "Drop at the center of the map and loot the area until the first circle comes up.",
                "Each time the circle changes, you must immediately start moving toward the new center.",
                "You may be anywhere within a one-block (100 meter) radius around the center block."
            ]}
            advancedFeature={
                <div>
                </div>
            }
        />;
    }
}