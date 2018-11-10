import React from 'react'
import MinorElement from './_minor-element'

const style={color: 'blue'};

export default class DisplayNameElement extends React.Component {

    render() {
        
        return <div>
            Display Name: <MinorElement text={this.props.name} style={style}/>
        </div>
    }
}