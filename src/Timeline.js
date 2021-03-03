import React, { useState, useEffect } from 'react'
import { Container, Grid, TextField, CssBaseline, Button } from '@material-ui/core'
import ContextMenu from './ContextMenu'
import Spell from './Spell'
import { bossSpells, nonBossSpells } from './spells'
import { useDrop } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'

const Timeline = () => {
    const checkValidity = str => {
        try {
            JSON.parse(atob(str))
            return true
        }
        catch (e) {
            return false
        }
    }

    const { str } = useParams()

    const [sharedValue, setSharedValue] = useState(checkValidity(str) ? str : 'W10=')
    const [xPos, setXPos] = useState(0)
    const [yPos, setYPos] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    const [addedSpells, setAddedSpells] = useState(checkValidity(str) ? JSON.parse(atob(str)) : [])
    const [rollingId, setRollingId] = useState(checkValidity(str) ? JSON.parse(atob(str)).reduce((p, c) => p.id > c.id ? p.id : c.id, 0) + 1 : 0)
    const [zoom, setZoom] = useState(0)
    const ref = React.createRef()
    const [emPerPx, setEmPerPx] = useState(0)

    const calculateRelativePosition = (x, y) => {
        const cur = ref.current
        const bodyRect = document.body.getBoundingClientRect()
        const elRect = cur.getBoundingClientRect()
        const offsetX = elRect.left - bodyRect.left - cur.scrollLeft
        const offsetY = elRect.top - bodyRect.top
        return { x: x - offsetX, y: y - offsetY }
    }

    const moveSpell = (id, x, y) => {
        console.log(id, x, y)
        const relPos = calculateRelativePosition(x, y)
        setAddedSpells(addedSpells.map(e => {
            if (e.id === id) {
                return {...e, x: relPos.x, y: relPos.y}
            }
            return e
        }))
    }

    const removeSpell = (id) => {
        if (addedSpells.length === 1) {
            setAddedSpells([])
        }
        else {
            setAddedSpells(addedSpells.filter(e => e.id !== id))
        }
    }

    const [, drop] = useDrop(() => ({
        accept: Object.keys(nonBossSpells),
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset()
            return moveSpell(item.id, offset.x, offset.y)
        }
    }), [moveSpell])

    const [, remove] = useDrop(() => ({
        accept: Object.keys(nonBossSpells),
        drop: item => removeSpell(item.id)
    }), [removeSpell])

    useEffect(() => {
        setSharedValue(Buffer.from(JSON.stringify(addedSpells)).toString('base64'))
    }, [addedSpells])

    useEffect(() => {
        setAddedSpells(JSON.parse(atob(sharedValue)))
        setRollingId(JSON.parse(atob(sharedValue)).reduce((p, c) => p.id > c.id ? p.id : c.id, 0) + 1)
    }, [sharedValue])

    const handleClick = (e) => {
        if (showMenu) setShowMenu(false)
    }

    const handleContextMenu = (e) => {
        e.preventDefault()
        setXPos(e.pageX)
        setYPos(e.pageY)
        setShowMenu(true)
    }

    const handleZoom = (delta) => {
        var zoom_ = zoom + delta
        if (zoom_ > 5) {
            zoom_ = 5
        }
        else if (zoom_ < -4) {
            zoom_ = -4
        }
        setZoom(zoom_)
    }

    useEffect(() => {
        const current = ref.current
        const fontSize = window.getComputedStyle(current).fontSize
        setEmPerPx(1 / fontSize.slice(0, fontSize.length - 2))
    }, [ref, emPerPx])

    useEffect(() => {
        const current = ref.current

        document.addEventListener("click", handleClick)
        current.addEventListener("contextmenu", handleContextMenu)

        return function cleanup() {
            document.removeEventListener("click", handleClick)
            current.removeEventListener("contextmenu", handleContextMenu)
        }
    })

    const buildTimeline = (tics) => {
        return (
            <table ref={drop} id="timeline-table">
                <tbody>
                    {/* one for sire */}
                    <tr id="timeline-table-tics">
                        {[...Array(tics * 2).keys()].map(e => <td key={e}></td>)}
                    </tr>
                    {Object.keys(nonBossSpells).map((e, i) => 
                        <tr id="timeline-table-tics" key={i}>
                            {[...Array(tics * 2).keys()].map(e => <td key={e}></td>)}
                        </tr>
                    )}
                    
                    <tr id="timeline-table-labels">
                        {[...Array(tics).keys()].map(e => <td key={e} colSpan="2">{Math.floor(e / 60)}:{(e % 60 < 10) ? '0' + e % 60 : e % 60}</td>)}
                    </tr>
                </tbody>
            </table>
        )
    }

    const addSpell = (x, y, spell) => {
        const relPos = calculateRelativePosition(x, y)
        setRollingId(rollingId + 1)
        setAddedSpells([...addedSpells, {id: rollingId, x: relPos.x, y: relPos.y, spell}])
    }

    const handleTextBoxChange = (e) => {
        if (!e.target.value) {
            setSharedValue('W10=')
        }
        else if (checkValidity(e.target.value)) {
            setSharedValue(e.target.value)
        }
    }

    return (
        <Container max="lg">
            <CssBaseline />
            <ContextMenu showMenu={showMenu} xPos={xPos} yPos={yPos} addSpell={addSpell} />
            <Grid container >
                <Grid item ref={ref} id="timeline-container">
                    {buildTimeline(180)}
                    {Object.keys(bossSpells).map((e, i) => <Spell key={i} id={i} x={bossSpells[e].time} y={0} spell={e} emPerPx={emPerPx} />)}
                    {addedSpells.map(e => <Spell key={e.id} id={e.id} x={e.x} y={e.y} spell={e.spell} emPerPx={emPerPx} />)}
                </Grid>
            </Grid>
            <Grid container alignItems="center" justify="center">
                <Grid item xs={8}>
                    <TextField fullWidth label="Shareable Code" multiline variant="outlined" rows={6} value={sharedValue} onChange={handleTextBoxChange} />
                </Grid>
                <Grid item xs={2} id="remove" ref={remove}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        {/*<Grid item>
                            <Button onClick={e => handleZoom(-1)}><FontAwesomeIcon icon={faSearchMinus} /></Button>
                            <Button onClick={e => handleZoom(1)}><FontAwesomeIcon icon={faSearchPlus} /></Button>
                        </Grid>*/}
                        <Grid item>
                            <p><FontAwesomeIcon icon={faTrash} /> Remove</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Timeline
