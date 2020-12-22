import React, {useEffect, useContext, useState, useRef} from 'react'
import { ToneEvent, Transport, TransportTime } from 'tone'
import { LooperContext } from '../../../context/LooperContext'
import Knob from './Knob'

export default function VolumeSection({track, handleVolumeChange, startTime, handleMute}) {

    const {
        dispatch
    } = useContext(LooperContext)

    const [mute, setMute] = useState(false)
    const muteRef = useRef(mute)
    muteRef.current = mute

    var saveTimeout

    const handleVolume = (value) => {

        handleVolumeChange(value)

        // set timeout that saves after changes are made
        clearTimeout(saveTimeout)
        track.volume = value
        saveTimeout = setTimeout(() => {
            dispatch({type: 'UPDATE_TRACK', track: track})
        }, 1000) 
    }

    const handlePause = () => {
        setMute(curr => !curr)
        new ToneEvent(() => {
            handleMute(muteRef.current)
        }).start(getNextLoopStartTime(startTime))
    }

    const getCurrentTactStartTime = () => {
        return (Math.floor(Transport.getSecondsAtTime(Transport.now()) / TransportTime('1m'))) * TransportTime('1m')
    }

    const getNextLoopStartTime = (startTime) => {

        let current = getCurrentTactStartTime()
        let length = track.numberOfBars * TransportTime('1m')
        return current + (length - (current - startTime)%length)
    }

    return (
        <div className="flex flex-grow items-center ">
            <div className="flex justify-center items-end">
                <button onClick={handlePause} className="text-white bg-gray-elements w-12 h-12 rounded-full flex items-center justify-center focus:outline-none mr-6 knob-shadow">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>

                <div className="flex-col flex justify-center items-center">
                    <label className="text-sm text-white select-none">
                        VOLUME
                    </label>
                    <Knob minValue={-20} maxValue={20} value={track.volume} setValue={handleVolume}/>
                </div>
            </div>
        </div>
    )
}
