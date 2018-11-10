import React from 'react';
import ModeWithSubmodes from './_mode-with-submodes';

export default class FireFromPositionMode extends React.Component {

    render() {
        return <ModeWithSubmodes
            displayName="'Fire' While"
            description=""
            rules={[
                "All fighting-item use (shooting, throwing grenade, using melee weapon) must be done from the chosen position.",
                "You may take any position for any action except actively 'firing'.",
                "Riding in a vehicle counts as 'moving', so it can only be used in that mode."
            ]}
            submodes={[
                {
                    displayName: "Standing",
                    description: "'Fire' only when standing still."
                },
                {
                    displayName: "Moving",
                    description: "'Fire' only while crawling, walking, running, or riding.",
                    rules: ["This mode does not include jumping/falling."]
                },
                {
                    displayName: "Jumping/Falling",
                    description: "'Fire' only while jumping or falling."
                },
                {
                    displayName: "Crouched",
                    description: "'Fire' only when crouched.",
                },
                {
                    displayName: "Prone",
                    description: "'Fire' only when prone.",
                    rules: ["Not the same as the 'Prone Only' game mode."]
                }
            ]}
        />;
    }
}