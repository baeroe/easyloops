import React, {useContext} from 'react'
import {LooperContext} from '../../../context/LooperContext'

export default function TrackMenuSection({track, userMediaNode}) {

    const {
        dispatch,
        activeTrack,
        setActiveTrack
    } = useContext(LooperContext)

    const handleDeleteTrack = () => {
        userMediaNode.close()
        dispatch({type: 'DELETE_TRACK', id: track.trackid})
    }

    return (
        /* LED and Buttons at the top */
        <div className="flex flex-row w-full flex-grow justify-end">

            {/* active led */}
            <div className={`led ${activeTrack === track.trackid ? 'led-active' : 'led-inactive'} self-center mr-auto`}></div>

            {/* menu and delete */}
            <button className="text-white focus:outline-none self-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg> 
            </button>
            <button onClick={handleDeleteTrack} className="text-white focus:outline-none self-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    )
}
