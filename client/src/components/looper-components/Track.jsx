import React from 'react'
import RecordButton from './RecordButton'
import Knob from './Knob'

export default function Track({empty}) {
    
    if (empty != true) {
        return (
            <div className="flex flex-col bg-gray-surface mr-4 rounded-lg px-4 py-2 items-center h-full">

                {/* Buttons at the top */}
                <div className="flex flex-row justify-end w-full flex-grow">
                    <button className="text-white focus:outline-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg> 
                    </button>
                    <button className="text-white focus:outline-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* title */}
                <div className="flex-grow">
                    <input className="bg-transparent w-40 text-white text-2xl font-semibold focus:outline-none" 
                    type="text" 
                    name="title" 
                    defaultValue="New Track"
                    />
                </div>

                {/* length */}
                <div className="flex flex-row justify-center w-full flex-grow">
                    <div className=" h-8 bg-gray-elements rounded-l-lg mr-px flex flex-row items-center">
                        <div className="text-white text-right mr-1 w-8">
                            2
                        </div>
                        <label className="text-white text-xs mr-2">BAR/S</label>
                    </div>
                    <button className="w-8 h-8 text-white bg-gray-elements mr-px focus:outline-none">
                        *2
                    </button>
                    <button className="w-8 h-8 text-white bg-gray-elements focus:outline-none rounded-r-lg">
                        /2
                    </button>
                </div>
                
                <RecordButton />

                {/* pause and volume */}
                <div className="flex flex-grow items-center ">
                    <div className="flex justify-center items-end">
                        <button className="text-white bg-gray-elements w-12 h-12 rounded-full flex items-center justify-center focus:outline-none mr-6 knob-shadow">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </button>

                        <div className="flex-col flex justify-center">
                            <label className="text-sm text-white">
                                VOLUME
                            </label>
                            <Knob />
                        </div>
                    </div>
                    
                </div>

                {/* EQ controller */}
                <div className="text-center flex-grow">
                    <label className="text-sm text-white">
                        TREBLE
                    </label>
                    <Knob />            
                </div>
                <div className="text-center flex-grow">
                    <label className="text-sm text-white">
                        MIDDLE
                    </label>
                    <Knob />            
                </div>
                <div className="text-center flex-grow">
                    <label className="text-sm text-white">
                        BASS
                    </label>
                    <Knob />            
                </div>
                <div className="text-center flex-grow">
                    <label className="text-sm text-white">
                        PAN
                    </label>
                    <Knob />            
                </div>
            </div>
        )
    } else {
        return (
            <button className=" track-skeleton flex flex-col mr-4 rounded-lg w-48 h-full border focus:outline-none text-gray-surface justify-center items-center">
                <svg className=" w-40 h-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            </button>
        )
    }
}
