import React from 'react'
import MinorElement from './_minor-element'

const style={color: 'green'};

export default class DescriptionElement extends React.Component {

    render() {
        
        return <div>
            Description: <MinorElement text={this.props.description} style={style}/>
        </div>
    }
}