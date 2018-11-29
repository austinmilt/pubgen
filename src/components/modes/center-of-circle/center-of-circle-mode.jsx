import React from 'react'
import Mode from '../_mode'
import CircleService from './circle-service';
import MapSelector from './map-selector';

import MAP_ERANGEL from '../../../resources/images/maps/erangel.jpg';
import MAP_MIRAMAR from '../../../resources/images/maps/miramar.jpg';
import MAP_SANHOK from '../../../resources/images/maps/sanhok.jpg';
import THUMB_ERANGEL from '../../../resources/images/thumbnails/erangel.jpg';
import THUMB_MIRAMAR from '../../../resources/images/thumbnails/miramar.jpg';
import THUMB_SANHOK from '../../../resources/images/thumbnails/sanhok.jpg';

const MapKey = { ERANGEL: 0, MIRAMAR: 1, SANHOK: 2 };

const MAP_PARAMS = {
    [MapKey.ERANGEL]: {map: MAP_ERANGEL, thumbnail: THUMB_ERANGEL},
    [MapKey.MIRAMAR]: {map: MAP_MIRAMAR, thumbnail: THUMB_MIRAMAR},
    [MapKey.SANHOK]: {map: MAP_SANHOK, thumbnail: THUMB_SANHOK},
};

let THUMB_PARAMS = [];
for (let key of Object.keys(MAP_PARAMS)) {
    THUMB_PARAMS.push({key: key, backgroundImage: MAP_PARAMS[key].thumbnail})
}


export default class CenterOfCircleMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mapState: this.constructMapSelector(),
        };
    }


    constructCircleService = (chosenMap) => {
        return <CircleService 
            height={800}
            width={800}
            backgroundImage={chosenMap}
        />;
    }


    onMapSelection = (mapKey) => {
        let chosenMap = MAP_PARAMS[mapKey].map;
        this.setState({mapState: this.constructCircleService(chosenMap)})
    }


    constructMapSelector = () => {
        return <MapSelector
            choices={THUMB_PARAMS}
            onClick={(mapKey) => {this.onMapSelection(mapKey);}}
            height={200}
            width={600}
        />;
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
            advancedFeature={this.state.mapState}
        />;
    }
}