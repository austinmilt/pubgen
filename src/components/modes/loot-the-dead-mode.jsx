import React from 'react'
import Mode from './_mode'

export default class LootTheDeadMode extends React.Component {

    render() {
        return <Mode 
            displayName="Loot the Dead"
            description="All your loot must come from dead players."
            rules={[
                "You may use punches and vehicles to fight, but all carry-able loot must be taken from dead players."
            ]}
        />;
    }
}