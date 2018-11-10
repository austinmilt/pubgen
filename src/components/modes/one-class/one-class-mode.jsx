import React from 'react'
import Mode from '../_mode'
import PlayersChooser from './players-chooser';

const WEAPON_CLASSES = [
    "Unarmed", "Pistols", "Melee", "DMR/Snipers", "Assault Rifles", "SMGs", 
    "Throwables", "Shotguns"
];

export default class OneClassMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playersClasses: null
        };
    }


    randomizeClassesForPlayers = (nPlayers) => {
        let chosenClasses = [];
        for (let i = 0; i < nPlayers; i++) {
            chosenClasses[i] = WEAPON_CLASSES[Math.floor(Math.random()*WEAPON_CLASSES.length)];
        }
        return chosenClasses;
    }
    
    
    constructOnePlayersClass(pIndex, pClass) {
        return <p key={pIndex}>Player {pIndex+1}: {pClass}</p>;
    }
    
    
    constructPlayersClasses = (pClasses) => {
        let constructedClasses = [];
        for (let i = 0; i < pClasses.length; i++) {
            constructedClasses.push(this.constructOnePlayersClass(i, pClasses[i]));
        }
        return constructedClasses;
    }
    
    
    playersChooserRenderHandler = (nPlayers) => {
        console.log("You have " + nPlayers + " players.");
        let chosenClasses = this.randomizeClassesForPlayers(nPlayers);
        this.setState({playersClasses: this.constructPlayersClasses(chosenClasses)});
    }


    render() {
        return <Mode 
            displayName="One Class"
            description="You are allowed only one class of weapon, and you dont get to decide what it is."
            rules={[
                "If your weapon class is a gun/melee, you are not allowed frags or molotovs, but you can use flashes and smokes.",
                "The sawed-off counts as a shotgun.",
                "The scorpion counts as an SMG."
            ]}
            advancedFeature={
                <div>
                    <PlayersChooser onClick={this.playersChooserRenderHandler}/>
                    {this.state.playersClasses}
                </div>
            }
        />;
    }
}