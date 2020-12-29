import React, { useContext } from 'react'
import { UserContext } from './../../context/UserContext'
import { useHistory } from 'react-router-dom'
import { LooperContext } from '../../context/LooperContext'
import { clone } from 'ramda'
import { Transport } from 'tone'
import axios from 'axios'

export default function LoopList({user, setUser}) {

    const {
        token
    } = useContext(UserContext)

    const {
        loop,
        dispatch,
        setSidebar,
        running,
        setRunning
    } = useContext(LooperContext)

    let history = useHistory()

    /////////////////////////////////////
    /// handler /////////////////////////
    /////////////////////////////////////

    const handleCreateLoop = (e) => {
        dispatch({type: 'CREATE_LOOP'})
        setSidebar(false)
    }

    const handleLoadLoop = async (e) => {

        Transport.stop()
        setRunning(false)

        // get loop object
        let loadedLoop = getLoopFromId(e.currentTarget.id)
        // decode it
        await decodeAudioString(loadedLoop)

        dispatch({type: 'LOAD_LOOP', loop: loadedLoop})
        setSidebar(false)
    }

    const handleDeleteLoop = (e) => {
        axios.delete('/api/loop', {
            data: {
                loopid: e.currentTarget.parentNode.id
            }
        }).then((res) => {
            console.log(res)
            setUser(res.data)
        }).catch((err) => {
            console.log(err)
        })
        e.stopPropagation()

    }

    const handleLogIn = () => {
        history.push('/login')
    }

    const handleSignIn = () => {
        history.push('/signup')
    }

    /////////////////////////////////////
    /// functions ///////////////////////
    /////////////////////////////////////


    const getLoopFromId = (loopid) => {
        for (let i = 0; i<user.loops.length; i++) {
            if (user.loops[i].loopid == loopid) {
                return clone(user.loops[i])
            }
        }
    }

    const decodeAudioString = async (loop) => {
        loop.tracks = loop.tracks.map( async (track) => {
            track.audio = track.audio.map( async (audio) => {
                return await base64ToBlob(audio)
            })
            await Promise.all(track.audio).then((value) => {
                track.audio = value
            })
            return track
        })
        await Promise.all(loop.tracks).then((value) => {
            loop.tracks = value
        })
    }

    const base64ToBlob = async (base64Data) => {

        const byteCharacters = atob(base64Data)

        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: "audio/webm;codecs=opus"});

        return blob
    }

    const idSameAsOpenLoop = (id) => {
        return loop.loopid == id
    }
    
    if (token != null) {
        return (
            <div className="flex flex-col justify-between mt-2 w-full">
                <div className="flex flex-row justify-between w-full">
                    <span className="text-white">LOOPS</span>
                    <button className="text-white focus:outline-none" onClick={handleCreateLoop}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>

                {/* Liste */}
                <ul className="mt-2">

                {
                    user != undefined && user.loops != undefined && user.loops.map((loop) => {
                        return (
                            <li 
                                key={loop.loopid}
                                id={loop.loopid}
                                className={`text-white flex flex-row items-center justify-between hover-bg-gray-surface w-56 h-12 rounded-lg px-2 py-1 mb-2 focus:outline-none cursor-pointer ${idSameAsOpenLoop(loop.loopid) && 'bg-gray-surface'}`}
                                onClick={handleLoadLoop}
                            >
                                <span className="w-40 overflow-hidden text-overflow-elipsis">{loop.loopname}</span>
                                <button onClick={handleDeleteLoop}className="text-white focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </li>
                        )
                    })
                }
                </ul>
                
            </div>
        )
    } else {
        return (
            <div className="flex flex-col text-white mt-10 w-56">
                <span className="text-center mb-4 text-sm">You have to be logged in to save and load loops.</span>
                <button onClick={handleLogIn} className="bg-easyloops-blue h-12 rounded-lg mb-4 focus:outline-none">
                    Sign In
                </button>
                <span className="text-center mb-4 text-sm">you don't have an account?</span>
                <button onClick={handleSignIn} className="bg-easyloops-blue h-12 rounded-lg focus:outline-none">
                    Sign Up
                </button>
            </div>
        )
    }
    
    
}
