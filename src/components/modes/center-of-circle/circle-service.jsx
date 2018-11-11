import React from 'react';
import Calculator from './circle-fit.jsx';

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
    width: 500,
    height: 500,
    border: '2px solid black',
    padding: 0,
    margin: 0
}

const CANVAS_STYLE = {
    position: "absolute",
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    margin: 0
};

const PREVENT_CONTEXT_MENU = true;

const CALCULATOR = new Calculator();


export default class CircleService extends React.Component {

    constructor(props) {
        super(props);
        this.circleCanvas = React.createRef();
        this.pointsCanvas = React.createRef();
        this.centerCanvas = React.createRef();
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
    // COMPONENT METHODS
    // ////////////////////////////////////////////////////////////////////////////////////////////

    onClick = (mouseEvent) => {
        switch (mouseEvent.button) {
            case 0: // left-click (see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
                let mousePosition = this.getMousePositionWithinElement(this.pointsCanvas.current, mouseEvent);
                this.drawPoint(mousePosition.x, mousePosition.y);
                CALCULATOR.addPoint(mousePosition.x, mousePosition.y);
                if (CALCULATOR.points.length > 2) {
                    this.updateCircle(); // also re-draws points and updates the center point
                }
                break;

            case 2: // right-click
                this.clearCircle();
                this.clearPoints();
                this.clearCenter();
                CALCULATOR.resetPoints();
                if (PREVENT_CONTEXT_MENU) { mouseEvent.preventDefault()};
                break;

            default: // do nothing
        }
    }


    componentWillUnmount() {
        CALCULATOR.resetPoints();
    }


    render() {
        let userDivStyle = this.props.divStyle;
        if (!userDivStyle) { userDivStyle = {}; }
        let divStyle = Object.assign(userDivStyle, DEFAULT_DIV_STYLE);
        divStyle.position = 'relative';
        return <div style={divStyle}>
            <img 
                src={this.props.backgroundImage}
                alt="Background Map (missing)"
                height={this.props.height} 
                width={this.props.width}
                style={CANVAS_STYLE}
            />
            <canvas 
                ref={this.circleCanvas} 
                width={this.props.width} 
                height={this.props.height}
                onClick={this.onClick}
                onContextMenu={this.onClick}
                style={CANVAS_STYLE}
            />
            <canvas
                ref={this.pointsCanvas}
                width={this.props.width}
                height={this.props.height}
                onClick={this.onClick}
                onContextMenu={this.onClick}
                style={CANVAS_STYLE}
            />
            <canvas
                ref={this.centerCanvas}
                width={this.props.width}
                height={this.props.height}
                onClick={this.onClick}
                onContextMenu={this.onClick}
                style={CANVAS_STYLE}
            />
        </div>;
    }
    
}