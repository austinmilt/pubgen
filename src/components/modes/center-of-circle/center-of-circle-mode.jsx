import React from 'react'
import Mode from '../_mode'
import CircleService from './circle-service';
import MAP_ERANGEL from '../../../resources/images/maps/erangel.jpg';

export default class CenterOfCircleMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: MAP_ERANGEL
        };
    }

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
                    <CircleService 
                        height={500}
                        width={500}
                        circleStyle={{lineWidth: 3, strokeStyle:"white"}}
                        pointStyle={{size: 5, fillStyle: "yellow"}}
                        centerStyle={{lineWidth: 2, strokeStyle: 'red'}}
                        backgroundImage={this.state.backgroundImage}
                    />
                </div>
            }
        />;
    }
}