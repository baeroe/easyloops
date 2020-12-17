import React, {createContext, useState, useReducer} from 'react'
import {Transport, TransportTime} from 'tone'
import { LoopReducer } from '../reducer/LoopReducer'


export const LooperContext = createContext()

const LooperContextProvider = (props) => {

    const [running, setRunning] = useState(false)
    const [looperEntered, setLooperEntered] = useState(false)
    const [sidebar, setSidebar] = useState(false)
    const [metronomSoundEnabled, setMetronomSoundEnabled] = useState(false)
    const [activeTrack, setActiveTrack] = useState(null)
    const [loop, dispatch] = useReducer(LoopReducer)

    //get the starttime of the current tact


    return (
        <LooperContext.Provider value={{
            looperEntered,
            setLooperEntered, 
            sidebar, 
            setSidebar, 
            running, 
            setRunning, 
            metronomSoundEnabled, 
            setMetronomSoundEnabled,
            loop,
            dispatch,
            activeTrack,
            setActiveTrack
        }}>
            {props.children}
        </LooperContext.Provider>
    )
}

export default LooperContextProvider
