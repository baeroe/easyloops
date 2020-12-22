import React, {useContext, useEffect, useRef} from 'react'
import { LooperContext } from '../../../context/LooperContext'

export default function LengthSection({track, startTime}) {

    const MAX_LENGTH = 16
    const MIN_LENGTH = 1

    var lengthElement = useRef(null)

    const {
        dispatch
    } = useContext(LooperContext)

    useEffect(() => {
        lengthElement.current.innerHTML = track.numberOfBars
    }, [])

    const handleTimesTwo = () => {
        // if maximum is not reached and starttime is unset
        if (lengthElement.current.innerHTML < MAX_LENGTH && startTime == -1) {
            lengthElement.current.innerHTML = lengthElement.current.innerHTML * 2
            track.numberOfBars = parseInt(lengthElement.current.innerHTML)
            dispatch({type: 'UPDATE_TRACK', track: track})
        } 
    }

    const handleDevideTwo = () => {
        // if minimum is not reached and starttime is unset
        if (lengthElement.current.innerHTML > MIN_LENGTH && startTime == -1) {
            lengthElement.current.innerHTML = lengthElement.current.innerHTML / 2
            track.numberOfBars = parseInt(lengthElement.current.innerHTML)
            dispatch({type: 'UPDATE_TRACK', track: track})
        }
    }

    return (
        /* length */
        <div className="flex flex-row justify-center w-full flex-grow">
            <div className=" h-8 bg-gray-elements rounded-l-lg mr-px flex flex-row items-center">
                <div ref={lengthElement} className="text-white text-right mr-1 w-8 select-none">
                    
                </div>
                <label className="text-white text-xs mr-2 select-none">BAR/S</label>
            </div>
            <button onClick={handleTimesTwo} className="w-8 h-8 text-white bg-gray-elements mr-px focus:outline-none select-none">
                *2
            </button>
            <button onClick={handleDevideTwo} className="w-8 h-8 text-white bg-gray-elements focus:outline-none rounded-r-lg select-none">
                /2
            </button>
        </div>
    )
}
