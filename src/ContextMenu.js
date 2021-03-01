import React from 'react'
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import { nonBossSpells } from './spells'

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 64,
        backgroundColor: theme.palette.background.paper
    }
}))

const ContextMenu = ({showMenu, xPos, yPos, addSpell}) => {
    const classes = useStyles()

    if (showMenu) {
        return (
            <List
                className={classes.root}
                style={{
                    position: "absolute",
                    top: `${yPos}px`,
                    left: `${xPos}px`,
                    zIndex: 65
                }}
            >
                {Object.keys(nonBossSpells).map(key => {
                    const spell = nonBossSpells[key];
                    return <ListItem key={key} button onClick={() => addSpell(xPos, yPos, key)}><ListItemText primary={spell.name} /></ListItem>
                })}
            </List>
        )
    }

    return null
}

export default ContextMenu
