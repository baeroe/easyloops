import React, {useContext, useEffect, useRef} from 'react'
import {Transport} from 'tone'
import axios from 'axios'
import {clone} from 'ramda'
import ReactTooltip from 'react-tooltip';

import { LooperContext } from '../../context/LooperContext'
import { UserContext } from '../../context/UserContext'
import MetronomSection from './MetronomSection'

import PlayIcon from './../../assets/play-icon'
import StopIcon from './../../assets/stop-icon'

export default function ControllBar({user, setUser}) {

    ///////////////////////////////////
    /// variables & states ////////////
    ///////////////////////////////////

    const {
        running,
        setRunning,
        loop,
        dispatch
    } = useContext(LooperContext)

    const {
        token
    } = useContext(UserContext)

    const playButtonRef = useRef(null)
    const stopButtonRef = useRef(null)
    const loopNameInputRef = useRef(null)


    ///////////////////////////////////
    /// effects ///////////////////////
    ///////////////////////////////////

    useEffect(() => {

        // add eventlistener for enter
        loopNameInputRef.current.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                loopNameInputRef.current.blur()
            }
        })

    }, [])

    useEffect(() => {
        if (loop != undefined) {
            loopNameInputRef.current.value = loop.loopname
        }
    
    }, [loop])


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

    const handleLoopName = (e) => {

        dispatch({type: 'UPDATE_LOOP', loopname: e.target.value, bpm: loop.bpm})
    }

    const handleSelectLoopName = (e) => {
        e.target.select()
    }

    const handleSave = async () => {

        var base64Loop = clone(loop)

        await prepareLoopForSave(base64Loop)

        axios.post('/api/loop', base64Loop).then((res) => {
            console.log(res)
            setUser(res.data)
        }).catch((err) => {
            console.log(err)
        })


        // convert base64 to blob
        // base64Loop.tracks = base64Loop.tracks.map( async (track) => {
        //     track.audio = track.audio.map( async (audio) => {
        //         return await base64ToBlob(audio)
        //     })
        //     await Promise.all(track.audio).then((value) => {
        //         track.audio = value
        //     })
        //     return track
        // })
        // await Promise.all(base64Loop.tracks).then((value) => {
        //     console.log(value)
        //     base64Loop.tracks = value
        // })
        
    }

    ///////////////////////////////////
    /// functions /////////////////////
    ///////////////////////////////////

    const prepareLoopForSave = async (loop) => {
        loop.tracks = loop.tracks.map( async (track) => {
            track.audio = track.audio.map( async (audio) => {
                let buffer = await audio.arrayBuffer()
                return arrayBufferToBase64(buffer)
            })
            await Promise.all(track.audio).then((value) => {
                track.audio = value
            })
            return track
        })
        await Promise.all(loop.tracks).then((value) => {
            console.log(value)
            loop.tracks = value
        })
        return loop
    }

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }



 
      


    ///////////////////////////////////
    /// render ////////////////////////
    ///////////////////////////////////

    return (
        <div className="w-full h-14 bg-gray-surface fixed top-0 shadow-controllbar flex flex-row justify-center items-center z-20">
            
            <MetronomSection />

            {/* play/stop buttons */}
            <div className="mr-5">
                <button ref={playButtonRef} onClick={handlePlay} id="play-btn" className={`bg-gray-elements py-2 px-4 text-white rounded-l-lg mr-px focus:outline-none`}>
                    <img className="w-6 h-6"src={PlayIcon} alt="play" />
                </button>
                <button ref={stopButtonRef} onClick={handleStop} id="stop-btn" className={`bg-gray-elements py-2 px-4 text-white rounded-r-lg mr-px focus:outline-none`}>
                    <img className="w-6 h-6"src={StopIcon} alt="stop" />
                </button>
            </div>

            {/* save loop container */}
            <div className="flex flex-row justify-center" data-tip data-for="save-tip">

                <input className={`${token != null ? null : 'pointer-events-none'} h-10 w-48 text-gray-surface rounded-l-lg pl-2 focus:outline-none focus:shadow-inner hover:shadow-inner transition-shadow duration-500`}
                    type="text" 
                    name="name" 
                    id="name"
                    ref={loopNameInputRef}
                    onClick={handleSelectLoopName}
                    onBlur={handleLoopName}/>
                <button onClick={handleSave} className={`${token != null ? null : 'pointer-events-none'} w-12 h-10 bg-easyloops-blue text-white rounded-r-lg text-xs focus:outline-none`}>save</button>
            </div>
            {
                token == null &&
                <ReactTooltip id="save-tip" type="dark">
                    You have to be logged in to save your loops
                </ReactTooltip>
            }
            
            
        </div>
    )
}
