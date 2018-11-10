import React from 'react';

export default class PlayersChooser extends React.Component {

    render() {
        return <div>
            <p>Choose your number of players to see which classes you get to use:</p>
            <p>
                <button onClick={() => this.props.onClick(1)}>1</button> 
                <button onClick={() => this.props.onClick(2)}>2</button> 
                <button onClick={() => this.props.onClick(4)}>4</button> 
                <button onClick={() => this.props.onClick(8)}>8</button> 
            </p>
        </div>;
    }
}