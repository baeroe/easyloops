import React, {useEffect, useContext} from 'react'
import { LooperContext } from "../../context/LooperContext"
import {useHistory} from 'react-router-dom' 
import LoopList from './LoopList'
import { UserContext } from '../../context/UserContext'

export default function SideMenu({user, setUser}) {

    const {
        sidebar,
        setSidebar
    } = useContext(LooperContext)
    
    const handleMenuButton = (e) => {
        setSidebar(curr => !curr)
        e.stopPropagation()
    }

    let history = useHistory()

    const handleBackground = (e) => {
        if (sidebar) setSidebar(false)
    }

    const handleSideBar = (e) => {
        if (!sidebar) setSidebar(true)
    }

    const handleExitButton = (e) => {
        setSidebar(false)
        history.push('/')
    }

    return (

        <div className="fixed top-0 h-full w-full flex flex-row pointer-events-none z-30">

            <div className={`h-full ${ sidebar ? 'w-64' : 'w-14 cursor-pointer' } bg-gray-elements shadow-sidemenu pointer-events-auto flex flex-col items-center`}
                onClick={handleSideBar}>
                <button className="text-white flex flex-col justify-center h-14 w-full top-0 focus:outline-none"
                    onClick={handleMenuButton}>
                    <svg className="w-10 h-10 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {
                sidebar ?
                <div>
                    {/* exit button */}
                    <button onClick={handleExitButton} className="text-white flex flex-row items-center hover-bg-gray-surface w-56 h-12 rounded-lg px-2 py-1 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        <span className="ml-5 text-center">Exit Looper</span>                    
                    </button>

                    <LoopList user={user} setUser={setUser}/>


                </div>
                : null
                }
            </div>

            <div onClick={handleBackground} id="sidemenu-bg" className={`h-full ${sidebar ? 'bg-blur cursor-pointer flex-auto' : null} pointer-events-auto`}></div>
            
        </div>
    )
}
