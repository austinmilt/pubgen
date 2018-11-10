import React from 'react';

const style = {
    fontSize: "20px",
    textAlign: "center",
    color: "#fff",
    outline: "none",
    padding: "12px 60px",
    boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
    backgroundColor: "rgb(255, 178, 56)",
    borderRadius: "6px",
    letterSpacing: "1.5px",
};

export default class Button extends React.Component {

  render() {
    return <button style={style} onClick={this.props.onClick}>{this.props.buttonText}</button>;
  }

}