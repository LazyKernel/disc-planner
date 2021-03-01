import React from 'react'
import { useDrag } from 'react-dnd'
import { nonBossSpells, spells } from './spells'

const Spell = ({id, x, y, spell, emPerPx}) => {
    /*
    red: cast / global cooldown
    grey: cooldown
    blue: atonement length
    teal: atonement extend with spirit shell legendary
    green: max time spirit shell absorb lasts on targets after atonement falls off
    purple: time the spell stays active
    */

    const [, drag] = useDrag(() => ({
        item: { id, type: spell }
    }))

    const spellInfo = spells[spell]

    const addBorderWidth = (num) => {
        return num * emPerPx
    }

    const getHeight = () => {
        if (spellInfo.class === "Sire") {
            return 2
        }

        return 2 * (Object.keys(nonBossSpells).indexOf(spell) + 2)
    }

    const getWidth = (width) => {
        return `${4 * width + addBorderWidth(width)}em`
    }

    const getPos = () => {
        if (spellInfo.class === "Sire") {
            return `${4 * (x + 1) + addBorderWidth(x + 1)}em`
        }

        return `${x}px`
    }

    return (
        <div
            ref={drag}
            style={{
                color: '#111',
                backgroundColor: '#ddd',
                position: 'absolute',
                top: `${getHeight()}em`,
                left: getPos(),
                width: getWidth(spellInfo.cooldown || spellInfo.cast || spellInfo.global || 1.5),
                height: '2em',
                zIndex: 2,
                cursor: 'ew-resize'
            }}
        >
            <div
                style={{
                    backgroundColor: '#e55',
                    position: 'absolute',
                    top: `0px`,
                    left: `0px`,
                    width: getWidth(spellInfo.cast ? spellInfo.cast : spellInfo.global),
                    height: '2em',
                    zIndex: 3,
                    cursor: 'ew-resize'
                }}
            >
            </div>
            <div
                style={{
                    backgroundColor: '#55e',
                    position: 'absolute',
                    top: `0px`,
                    left: `0px`,
                    width: getWidth(spellInfo.atonement ? spellInfo.atonement : 0),
                    height: '1em',
                    zIndex: 4,
                    cursor: 'ew-resize'
                }}
            >  
            </div>
            <div
                style={{
                    backgroundColor: '#5ee',
                    position: 'absolute',
                    top: `0px`,
                    left: getWidth(spellInfo.atonement ? spellInfo.atonement : 0),
                    width: getWidth(spellInfo.atonement ? 3 : 0),
                    height: '1em',
                    zIndex: 4,
                    cursor: 'ew-resize'
                }}
            >  
            </div>
            <div
                style={{
                    backgroundColor: '#5e5',
                    position: 'absolute',
                    top: `0px`,
                    left: getWidth(spellInfo.atonement ? spellInfo.atonement + 3 : 0),
                    width: getWidth(spellInfo.atonement ? 10 : 0),
                    height: '1em',
                    zIndex: 4,
                    cursor: 'ew-resize'
                }}
            >  
            </div>
            <div
                style={{
                    backgroundColor: '#e5e',
                    position: 'absolute',
                    top: `0px`,
                    left: `0px`,
                    width: getWidth(spellInfo.active ? spellInfo.active : 0),
                    height: '1em',
                    zIndex: 4,
                    cursor: 'ew-resize'
                }}
            >  
            </div>
            <p style={{fontWeight: 'bold', position: 'absolute', margin: '2px', zIndex: 5}}>{spellInfo.name}</p>
        </div>
    )
}

export default Spell
