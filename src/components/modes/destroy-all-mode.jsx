import React from 'react';
import ModeWithSubmodes from './_mode-with-submodes';

export default class DestroyAllMode extends React.Component {

    render() {
        return <ModeWithSubmodes
            displayName="Destroy All"
            description=""
            rules={[
                "As soon as you see the thing, you must destroy it before fighting.",
                "You may destroy the thing using any means (gun, car, grenade, etc.).",
                "You may heal, loot, or do anything (except fight) to help you destroy the thing.",
                "You do not have to seek out the thing at any point."
            ]}
            submodes={[
                {
                    displayName: "Windows",
                    description: "Destroy all windows you see before you do anything else."
                },
                {
                    displayName: "Shacks",
                    description: "Destroy all shacks you see before you do anything else."
                },
                {
                    displayName: "Fences",
                    description: "Destroy all fences you see before you do anything else."
                },
                {
                    displayName: "Tires",
                    description: "Destroy all tires you see before you do anything else.",
                    rules: ["Yes, this does include the tires of a vehicle you want(ed) to drive."]
                }
            ]}
        />
    }
}