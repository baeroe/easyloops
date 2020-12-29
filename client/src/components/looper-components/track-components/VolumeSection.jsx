import React, {useEffect, useContext, useState, useRef} from 'react'
import { ToneEvent, Transport, TransportTime } from 'tone'
import { LooperContext } from '../../../context/LooperContext'
import Knob from './Knob'

import PauseIcon from './../../../assets/pause-icon'
import PlayIcon from './../../../assets/play-icon'

export default function VolumeSection({track, handleVolumeChange, startTime, trackLoops}, index) {

    const {
        dispatch
    } = useContext(LooperContext)

    const [mute, setMute] = useState(false)
    const muteRef = useRef(mute)
    muteRef.current = mute

    const startTimeRef = useRef(startTime)
    startTimeRef.current = startTime

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

        setMute(currMute => {
            if (currMute == false) {
                trackLoops.forEach((loop) => {
                    loop.stop()
                })
            } else {
                trackLoops.forEach((loop) => {
                    loop.start(getNextLoopStartTime(startTimeRef.current))
                })
            }

            return !currMute
        })
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
                <button onClick={handlePause} className={`text-white w-12 h-12 rounded-full flex items-center justify-center focus:outline-none mr-6 knob-shadow bg-gray-elements`}>
                    {
                        mute ? 
                            <img className="w-6 h-6" src={PlayIcon} alt="play" />
                        :
                            <img className="w-6 h-6" src={PauseIcon} alt="pause" /> 
                    }
                </button>

                <div className="flex-col flex justify-center items-center">
                    <label className="text-sm text-white select-none">
                        VOLUME
                    </label>
                    <Knob minValue={-20} maxValue={20} value={track.volume} setValue={handleVolume} index={index} type="volume"/>
                </div>
            </div>
        </div>
    )
}
