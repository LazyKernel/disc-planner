import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Timeline from './Timeline'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
})

const App = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <DndProvider backend={HTML5Backend}>
                    <Switch>
                        <Route path="/:str?">
                            <Timeline />    
                        </Route> 
                    </Switch>
                </DndProvider>
            </ThemeProvider>
        </Router>
    )
}

export default App;
