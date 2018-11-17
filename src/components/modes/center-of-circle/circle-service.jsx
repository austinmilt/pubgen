import React from 'react';
import Calculator from './circle-fit.jsx';
import PropTypes from 'prop-types';

const DEFAULT_CIRCLE_STYLE = {
    lineWidth: 3,
    strokeStyle: 'white'
};

const DEFAULT_POINT_STYLE = {
    fillStyle: 'yellow',
    size: 3
};

const DEFAULT_CENTER_STYLE = {
    lineWidth: 2,
    strokeStyle: 'red'
};

const DEFAULT_DIV_STYLE = {
    position: 'relative',
    left: 0,
    top: 0,
    border: '2px solid black',
    // padding: 0,
    // margin: 0,
    overflow: 'hidden'
}

const CANVAS_STYLE = {
    position: "absolute",
    left: 0,
    top: 0,
    // margin: 0,
};

const IMAGE_STYLE = {};

const PREVENT_CONTEXT_MENU = true;
const CALCULATOR = new Calculator();
const SCROLL_ZOOM_RATE = 0.002*125.0; //one scroll on my mouse is a deltaY of 125
const SCROLL_TRANSLATE_RATE = 0.3;
const ZOOM_MIN = 100;
const ZOOM_MAX = 1000;
const DRAG_EPSILON = 10; //pixels, less than which is considered not dragging

export default class CircleService extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            xOffset: 0.0,
            yOffset: 0.0,
            zoom: 100,
            dragStartX: null,
            dragStartY: null,
            dragStartXOffset: null,
            dragStartYOffset: null
        };
        this.circleCanvas = React.createRef();
        this.pointsCanvas = React.createRef();
        this.centerCanvas = React.createRef();
        this.map = React.createRef();

        //for getting mouse position on wheel event
        window.onmousewheel=document.onmousewheel=this.onScrollMousePosition; 
        if(document.addEventListener){
            this.scrollListener = document.addEventListener('DOMMouseScroll', this.onScrollMousePosition, false);
        }
    }


    // ////////////////////////////////////////////////////////////////////////////////////////////
    // GENERAL DRAWING/CANVAS METHODS
    // ////////////////////////////////////////////////////////////////////////////////////////////

    clearCanvas = (canvas) => {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    getMousePositionWithinElement = (element, mouseEvent) => {
        let elementRect = element.getBoundingClientRect();
        let x = mouseEvent.clientX - elementRect.left;
        let y = mouseEvent.clientY - elementRect.top;
        return {x: x, y: y};
    }



    // ////////////////////////////////////////////////////////////////////////////////////////////
    // CIRCLE METHODS
    // ////////////////////////////////////////////////////////////////////////////////////////////

    drawCircle = (centerX, centerY, radius) => {

        // create the circle
        let ctx = this.circleCanvas.current.getContext("2d");
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 2*Math.PI, false);

        // style the circle
        let lineWidth;
        if (this.props.circleStyle.lineWidth) {
            lineWidth = this.props.circleStyle.lineWidth;
        }
        else {
            lineWidth = DEFAULT_CIRCLE_STYLE.lineWidth;
        }

        let strokeStyle;
        if (this.props.circleStyle.strokeStyle) {
            strokeStyle = this.props.circleStyle.strokeStyle;
        }
        else {
            strokeStyle = DEFAULT_CIRCLE_STYLE.strokeStyle;
        }
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        // draw the circle
        ctx.stroke();
    }

    
    clearCircle = () => {
        this.clearCanvas(this.circleCanvas.current);
    }


    updateCircle = () => {
        let circle = CALCULATOR.compute();
        if (circle.success) {
            this.clearCircle();
            this.drawCircle(circle.center.x, circle.center.y, circle.radius);
            this.clearCenter();
            this.drawCenter(circle.center.x, circle.center.y, circle.radius*0.1); //(re)draw the center
        }
    }



    // ////////////////////////////////////////////////////////////////////////////////////////////
    // POINTS METHODS
    // ////////////////////////////////////////////////////////////////////////////////////////////

    drawPoint = (x, y) => {
        
        // get point properties
        let size;
        if (this.props.pointStyle.size) {
            size = this.props.pointStyle.size;
        }
        else { 
            size = DEFAULT_POINT_STYLE.size;
        }

        let fillStyle;
        if (this.props.pointStyle.fillStyle) {
            fillStyle = this.props.pointStyle.fillStyle;
        }
        else { 
            fillStyle = DEFAULT_POINT_STYLE.fillStyle;
        }

        // make the point
        let ctx = this.pointsCanvas.current.getContext("2d");
        ctx.beginPath();
        ctx.arc(x, y, size, 2*Math.PI, false);

        // draw and style the point
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }


    clearPoints = () => {
        this.clearCanvas(this.pointsCanvas.current);
    }



    // ////////////////////////////////////////////////////////////////////////////////////////////
    // CENTER METHODS
    // ////////////////////////////////////////////////////////////////////////////////////////////

    drawCenter = (centerX, centerY, radius) => {

        // create the circle
        let ctx = this.centerCanvas.current.getContext("2d");
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 2*Math.PI, false);

        // style the circle
        let lineWidth;
        if (this.props.centerStyle.lineWidth) {
            lineWidth = this.props.centerStyle.lineWidth;
        }
        else {
            lineWidth = DEFAULT_CENTER_STYLE.lineWidth;
        }

        let strokeStyle;
        if (this.props.centerStyle.strokeStyle) {
            strokeStyle = this.props.centerStyle.strokeStyle;
        }
        else {
            strokeStyle = DEFAULT_CENTER_STYLE.strokeStyle;
        }
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        // draw the circle
        ctx.stroke();
    }


    clearCenter = () => {
        this.clearCanvas(this.centerCanvas.current);
    }



    // ////////////////////////////////////////////////////////////////////////////////////////////
    // MAP METHODS
    // ////////////////////////////////////////////////////////////////////////////////////////////


    //TODO this still allows to drag a little bit into the whitespace of the div???
    //TODO need to move and scale the points/circles when we drag around
    setTransform = (xOffsetDesired, yOffsetDesired, scaleDesired) => {
        let scale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, scaleDesired));
        
        const xOffsetMax = (this.props.width/2.0)*(scale/100.0 - 1.0);
        const yOffsetMax = (this.props.height/2.0)*(scale/100.0 - 1.0);
        let xOffset = Math.min(xOffsetMax, Math.max(-xOffsetMax, xOffsetDesired));
        let yOffset = Math.min(yOffsetMax, Math.max(-yOffsetMax, yOffsetDesired));

        this.setState({xOffset: xOffset, yOffset: yOffset, zoom: scale});

        this.map.current.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale/100.0})`;
        this.map.current.style.webkitTransform = `translate(${xOffset}px, ${yOffset}px) scale(${scale/100.0})`;
        this.map.current.style.msTransform = `translate(${xOffset}px, ${yOffset}px) scale(${scale/100.0})`;
    }


    updateZoom = (wheelDelta) => {
        let zoom = this.state.zoom - wheelDelta*SCROLL_ZOOM_RATE;

        //only attempt to zoom if we're not trying to go beyond our limit
        let tryZoomIn = (wheelDelta > 0) && (zoom < ZOOM_MAX);
        let tryZoomOut = (wheelDelta < 0) && (zoom > ZOOM_MIN);
        if (tryZoomIn || tryZoomOut) { 
            this.setTransform(this.state.xOffset, this.state.yOffset, zoom);
        }
    }


    scrollTranslate = (mousePosition) => {
        let mouseXDistanceFromCenter = mousePosition.x - this.props.width/2.0;
        let mouseYDistanceFromCenter = mousePosition.y - this.props.height/2.0;
        let xDistanceToMove = -SCROLL_TRANSLATE_RATE*mouseXDistanceFromCenter;
        let yDistanceToMove = -SCROLL_TRANSLATE_RATE*mouseYDistanceFromCenter;
        let xOffset = this.state.xOffset + xDistanceToMove;
        let yOffset = this.state.yOffset + yDistanceToMove;
        this.setTransform(xOffset, yOffset, this.state.zoom);
    }



    // ////////////////////////////////////////////////////////////////////////////////////////////
    // COMPONENT METHODS
    // ////////////////////////////////////////////////////////////////////////////////////////////

    onContextMenu = (event) => {
        if (PREVENT_CONTEXT_MENU) { event.preventDefault(); }   
    }

    
    onWheel = (wheelEvent) => {
        this.updateZoom(wheelEvent.deltaY);
        wheelEvent.preventDefault();
    }


    onScrollMousePosition = (event) => {
        let mousePosition = this.getMousePositionWithinElement(this.pointsCanvas.current, event) //get position within an element that isnt scaling
        this.scrollTranslate(mousePosition);
    }


    onMouseDown = (mouseEvent) => {
        switch (mouseEvent.button) {
            case 0: //left-click
                
                //start allowing dragging
                let mousePosition = this.getMousePositionWithinElement(this.pointsCanvas.current, mouseEvent);
                this.setState({
                    dragStartX: mousePosition.x, 
                    dragStartY: mousePosition.y,
                    dragStartXOffset: this.state.xOffset,
                    dragStartYOffset: this.state.yOffset
                });
                break;

            default: break;
        }
    }


    onMouseUp = (mouseEvent) => {
        switch (mouseEvent.button) {

            // drag the map or add a circle point (and draw circle if needed)
            case 0: //left-click (see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)

                // add a map point (and maybe draw a circle) if the map wasnt dragged (much)
                let totalXMove = Math.abs(this.state.dragStartXOffset - this.state.xOffset);
                let totalYMove = Math.abs(this.state.dragStartYOffset - this.state.yOffset);
                if ((totalXMove < DRAG_EPSILON) || (totalYMove < DRAG_EPSILON)) {
                    let mousePosition = this.getMousePositionWithinElement(this.pointsCanvas.current, mouseEvent);
                    this.drawPoint(mousePosition.x, mousePosition.y);
                    CALCULATOR.addPoint(mousePosition.x, mousePosition.y);
                    if (CALCULATOR.points.length > 2) {
                        this.updateCircle(); // also re-draws points and updates the center point
                    }
                }

                //stop activation if they let go of mouse button
                this.setState({
                    dragStartX: null, 
                    dragStartY: null,
                    dragStartXOffset: null,
                    dragStartYOffset: null
                });
                break;

            // clear the circle and points (if there is one)
            case 2: // right-click
                this.clearCircle();
                this.clearPoints();
                this.clearCenter();
                CALCULATOR.resetPoints();
                break;

            default: // do nothing
        }
    }


    onMouseLeave = (mouseEvent) => {

        //stop dragging if they leave the div
        this.setState({
            dragStartX: null, 
            dragStartY: null,
            dragStartXOffset: null,
            dragStartYOffset: null
        });
    }


    onMouseMove = (mouseEvent) => {
        if (this.state.dragStartX !== null) { //i.e. the drag is active

            //how far is the pointer from the dragging start position
            let mousePosition = this.getMousePositionWithinElement(this.pointsCanvas.current, mouseEvent);
            let xDiff = mousePosition.x - this.state.dragStartX; 
            let yDiff = mousePosition.y - this.state.dragStartY;
            
            // calculate how much to move the map
            let xOffset = this.state.dragStartXOffset + xDiff; //how much should we move relative to the map's position when dragging started
            let yOffset = this.state.dragStartYOffset + yDiff;

            // try to move the map
            this.setTransform(xOffset, yOffset, this.state.zoom);
        }
    }


    componentWillUnmount() {
        CALCULATOR.resetPoints();
        document.removeEventListener('DOMMouseScroll', this.scrollListener);
    }


    render() {
        let userDivStyle = this.props.divStyle;
        if (!userDivStyle) { userDivStyle = {}; }
        let divStyle = Object.assign(userDivStyle, DEFAULT_DIV_STYLE);
        divStyle.overflow = "hidden";
        divStyle.width = this.props.width;
        divStyle.height = this.props.height;
        divStyle.position = 'relative';
        return <div 
            style={divStyle} 
            onWheel={this.onWheel} 
            onContextMenu={this.onContextMenu}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onMouseLeave={this.onMouseLeave}
            onMouseMove={this.onMouseMove}
        >
            <img 
                ref={this.map}
                src={this.props.backgroundImage}
                alt="display missing"
                style={Object.assign({display: 'inline-block', margin: 'auto'}, CANVAS_STYLE)}
                height={this.props.height}
                width={this.props.width}
            />
            <canvas 
                ref={this.circleCanvas} 
                onClick={this.onClick}
                style={CANVAS_STYLE}
                height={this.props.height}
                width={this.props.width}
            />
            <canvas
                ref={this.pointsCanvas}
                onContextMenu={this.onClick}
                style={CANVAS_STYLE}
                height={this.props.height}
                width={this.props.width}
            />
            <canvas
                ref={this.centerCanvas}
                onClick={this.onClick}
                style={CANVAS_STYLE}
                height={this.props.height}
                width={this.props.width}
            />
        </div>;
    }
    
}

CircleService.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string,
    circleStyle: PropTypes.shape({lineWidth: PropTypes.number, strokeStyle: PropTypes.string}),
    pointStyle: PropTypes.shape({size: PropTypes.number, fillStyle: PropTypes.string}),
    centerStyle: PropTypes.shape({lineWidth: PropTypes.number, strokeStyle: PropTypes.string}),
    divStyle: PropTypes.shape({
        left: PropTypes.number, top: PropTypes.number, width: PropTypes.number, 
        height: PropTypes.number, border: PropTypes.string
    })
};