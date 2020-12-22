import React, {useContext, useEffect} from 'react'
import {Transport} from 'tone'

import { LooperContext } from '../../context/LooperContext'
import MetronomSection from './MetronomSection'

export default function ControllBar({user}) {

    ///////////////////////////////////
    /// variables & states ////////////
    ///////////////////////////////////

    const {
        running,
        setRunning
    } = useContext(LooperContext)

    var playButton, stopButton

    ///////////////////////////////////
    /// effects ///////////////////////
    ///////////////////////////////////

    // get dom elements
    useEffect(() => {
        playButton = document.getElementById('play-btn') 
        stopButton = document.getElementById('stop-btn')
    }, [])


    ///////////////////////////////////
    /// handler ///////////////////////
    ///////////////////////////////////
    const handlePlay = () => {
        Transport.start()
        setRunning(true)

    }

    const handleStop = () => {
        Transport.stop()
        Transport.cancel(0.1)
        setRunning(false)

    }


    ///////////////////////////////////
    /// render ////////////////////////
    ///////////////////////////////////

    return (
        <div className="w-full h-14 bg-gray-surface fixed top-0 shadow-controllbar flex flex-row justify-center items-center z-20">
            
            <MetronomSection />

            {/* play/stop buttons */}
            <div className="mr-5">
                <button onClick={handlePlay} id="play-btn" className="bg-gray-elements py-2 px-4 text-white rounded-l-lg mr-px focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
                <button onClick={handleStop} id="stop-btn" className="bg-gray-elements py-2 px-4 text-white rounded-r-lg focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
                    </svg>
                </button>
            </div>

            {/* save loop container */}
            <div className="flex flex-row justify-center">
                <input className="h-10 w-48 text-gray-surface rounded-l-lg pl-2 focus:outline-none focus:shadow-inner hover:shadow-inner transition-shadow duration-500" 
                    type="text" 
                    name="name" 
                    id="name"
                    defaultValue="unnamed"/>
                <button className="w-12 h-10 bg-easyloops-blue text-white rounded-r-lg text-xs focus:outline-none">save</button>
            </div>
            
        </div>
    )
}
