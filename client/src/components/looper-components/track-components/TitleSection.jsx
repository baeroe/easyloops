import React, { useContext, useEffect, useRef } from 'react'
import { LooperContext } from './../../../context/LooperContext'

export default function TitleSection({track}) {

    const {
        loop,
        dispatch
    } = useContext(LooperContext)

    var titleElement = useRef(null)

    useEffect(() => {
        // set trackname form model
        titleElement.current.value = track.trackname
        // add eventlistener for enter
        titleElement.current.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                titleElement.current.blur()
            }
        })
    }, [])

    const handleTrackName = (e) => {
        track.trackname = e.target.value
        dispatch({type: 'UPDATE_TRACK', track: track})
    }

    const handleSelectTrackName = (e) => {
        e.target.select()
    }

    return (
        <div className="flex-grow">
            <input ref={titleElement} className="bg-transparent w-40 text-white text-2xl font-semibold focus:outline-none" 
            type="text" 
            name="title" 
            onBlur={handleTrackName}
            onClick={handleSelectTrackName}
            />
        </div>
    )
}
