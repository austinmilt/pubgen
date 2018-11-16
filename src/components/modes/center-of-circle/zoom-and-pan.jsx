import React from 'react';

const DIV_STYLE = {
    overflow: 'hidden'
};

const IMAGE_STYLE = {};

const ZOOM_RATE = 0.02*125.0;

export default class ZoomAndPan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            centerX: props.width / 2,
            centerY: props.height / 2,
            zoom: 100,
        };
        this.image = React.createRef();
    }


    updateZoom = (event) => {
        let zoom = this.state.zoom + event.deltaY*ZOOM_RATE;
        this.setState({zoom: zoom});
        // this.image.current.style.transform = `scale(${zoom}%)`;
        console.log("zoom rate: " + ZOOM_RATE);
        console.log("zoom change: " + event.deltaY*ZOOM_RATE);
        console.log(zoom);
        this.image.current.style.height = this.props.height*zoom;
        this.image.current.style.width = this.props.width*zoom;
    }


    render() {
        let divStyle = Object.assign(DIV_STYLE, this.props.style);
        divStyle = Object.assign({
            height: this.props.height,
            width: this.props.width
        }, divStyle);

        return <img
                ref={this.image}
                src={this.props.image}
                alt="display missing"
                height={this.props.height} 
                width={this.props.width}
                style={IMAGE_STYLE}
                onWheel={this.updateZoom}
                onClick={() => {console.log("clicked");}}
            />;
       
    }
}