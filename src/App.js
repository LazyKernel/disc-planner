import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Timeline from './Timeline'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.css'

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
})

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <DndProvider backend={HTML5Backend}>
                <Timeline />
            </DndProvider>
        </ThemeProvider>
    )
}

export default App;
