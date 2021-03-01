import React from 'react'
import { useDrag } from 'react-dnd'
import { nonBossSpells, spells } from './spells'

const Spell = ({id, x, y, spell}) => {
    const [, drag] = useDrag(() => ({
        item: { id, type: spell }
    }))

    const spellInfo = spells[spell]

    const getHeight = () => {
        if (spellInfo.class === "Sire") {
            return 2
        }

        return 2 * (Object.keys(nonBossSpells).indexOf(spell) + 2)
    }

    const getPos = () => {
        if (spellInfo.class === "Sire") {
            return `${4 * x}em`
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
                width: `${4 * (spellInfo.cooldown || spellInfo.cast || spellInfo.global || 1.5)}em`,
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
                    width: `${spellInfo.cast ? 4 * spellInfo.cast : 4* spellInfo.global}em`,
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
                    width: `${spellInfo.atonement ? 4 * spellInfo.atonement : 0}em`,
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
                    left: `${spellInfo.atonement ? 4 * spellInfo.atonement : 0}em`,
                    width: `${spellInfo.atonement ? 4 * 3 : 0}em`,
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
                    left: `${spellInfo.atonement ? 4 * (spellInfo.atonement + 3) : 0}em`,
                    width: `${spellInfo.atonement ? 4 * 10 : 0}em`,
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
                    left: `0`,
                    width: `${spellInfo.active ? 4 * spellInfo.active : 0}em`,
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
