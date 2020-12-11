import React from 'react'

export default function ControllBar({user}) {
    return (
        <div className="w-full h-14 bg-gray-surface fixed top-0 shadow-controllbar flex flex-row justify-center items-center">
            
            {/* metronom lights container */}
            <div id="metronom-dots" className="h-full flex flex-row items-center mr-5">
                <div className="rounded-full w-6 h-6 bg-white mr-2"></div>
                <div className="rounded-full w-6 h-6 bg-white mx-2"></div>
                <div className="rounded-full w-6 h-6 bg-white mx-2"></div>
                <div className="rounded-full w-6 h-6 bg-white ml-2"></div>
            </div>

            {/* bpm container */}
            <div className="bg-gray-elements rounded-lg py-1 px-2 mr-5">
                <input className=" bg-transparent text-right text-xl focus:outline-none text-white w-10 h-8 mr-1"
                    type="number" 
                    name="bpm" 
                    id="bpm"
                    defaultValue="120"/>
                <label className="text-white text-xs"
                htmlFor="bpm">BPM</label>
            </div>

            {/* metronom button */}
            <button className="bg-gray-elements rounded-lg p-2 text-white mr-5 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
            </button>

            {/* play/stop buttons */}
            <div className="mr-5">
                <button className="bg-gray-elements py-2 px-4 text-white rounded-l-lg mr-px focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
                <button className="bg-gray-elements py-2 px-4 text-white rounded-r-lg focus:outline-none">
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
