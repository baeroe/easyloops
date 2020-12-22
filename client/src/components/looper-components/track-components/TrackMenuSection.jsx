import React, {useContext} from 'react'
import {LooperContext} from '../../../context/LooperContext'

export default function TrackMenuSection({track, userMediaNode, trackLoops, setTrackLoops, setStartTime}) {

    const {
        dispatch,
        activeTrack,
        setActiveTrack
    } = useContext(LooperContext)

    const handleDeleteTrack = () => {
        userMediaNode.close()
        dispatch({type: 'DELETE_TRACK', id: track.trackid})
    }

    const handleUndoLastRecording = () => {
        // delete last loop element
        if (trackLoops.length != 0) {
            trackLoops[trackLoops.length-1].stop()
            trackLoops[trackLoops.length-1].dispose()

            setTrackLoops((curr) => {
                curr.pop()
                // if the last loop was removed, set starttime to initital value
                if (curr.length == 0) {
                    setStartTime(-1)
                }
                return curr
            })
        }

        // delete last track.audio element
        if (track.audio.length != 0) {
            track.audio.pop()
            dispatch({type: 'UPDATE_TRACK', track: track})
        }

    }


    return (
        /* LED and Buttons at the top */
        <div className="flex flex-row w-full flex-grow justify-end">

            {/* active led */}
            <div className={`led ${activeTrack === track.trackid ? 'led-active' : 'led-inactive'} self-center mr-auto`}></div>

            {/* undo */}
            <button onClick={handleUndoLastRecording} className="text-white focus:outline-none self-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                </svg>
            </button>

            {/* delete */}
            <button onClick={handleDeleteTrack} className="text-white focus:outline-none self-center ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    )
}
