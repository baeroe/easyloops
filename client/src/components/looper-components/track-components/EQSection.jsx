import React, {useContext} from 'react'
import { LooperContext } from '../../../context/LooperContext'
import Knob from './Knob'

export default function EQSection({track, handleTrebleChange, handleMiddleChange, handleBassChange, handlePanningChange, index}) {

    const {
        dispatch
    } = useContext(LooperContext)


    var saveTimeout

    const handleTreble = (value) => {

        handleTrebleChange(value)

        // set timeout that saves after changes are made
        clearTimeout(saveTimeout)
        track.treble = value
        saveTimeout = setTimeout(() => {
            dispatch({type: 'UPDATE_TRACK', track: track})
        }, 1000) 
    }

    const handleMiddle = (value) => {

        handleMiddleChange(value)

        // set timeout that saves after changes are made
        clearTimeout(saveTimeout)
        track.middle = value
        saveTimeout = setTimeout(() => {
            dispatch({type: 'UPDATE_TRACK', track: track})
        }, 1000) 
    }

    const handleBass = (value) => {

        handleBassChange(value)

        // set timeout that saves after changes are made
        clearTimeout(saveTimeout)
        track.bass = value
        saveTimeout = setTimeout(() => {
            dispatch({type: 'UPDATE_TRACK', track: track})
        }, 1000) 
    }

    const handlePanning = (value) => {

        handlePanningChange(value)

        // set timeout that saves after changes are made
        clearTimeout(saveTimeout)
        track.panning = value
        saveTimeout = setTimeout(() => {
            dispatch({type: 'UPDATE_TRACK', track: track})
        }, 1000) 
    }

    return (
        <>
        
            <div className="flex flex-col items-center flex-grow">
                <label className="text-sm text-white select-none">
                    TREBLE
                </label>
                <Knob minValue={-20} maxValue={20} value={track.treble} setValue={handleTreble} index={index} type="treble"/>            
            </div>

            <div className="flex flex-col items-center flex-grow">
                <label className="text-sm text-white select-none">
                    MIDDLE
                </label>
                <Knob minValue={-20} maxValue={20} value={track.middle} setValue={handleMiddle} index={index} type="middle"/>            
            </div>

            <div className="flex flex-col items-center flex-grow">
                <label className="text-sm text-white select-none">
                    BASS
                </label>
                <Knob minValue={-20} maxValue={20} value={track.bass} setValue={handleBass} index={index} type="bass"/>            
            </div>

            <div className="flex flex-col items-center flex-grow">
                <label className="text-sm text-white select-none">
                    PAN
                </label>
                <Knob minValue={-1} maxValue={1} value={track.panning} setValue={handlePanning} index={index} type="pan"/>            
            </div>

        </>
    )
}
