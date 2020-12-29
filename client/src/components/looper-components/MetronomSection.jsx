import React, {useEffect, useState, useContext} from 'react'
import {Transport, Loop, TransportTime, Player, Gain, Volume} from 'tone'
import ReactTooltip from 'react-tooltip'

import {LooperContext} from './../../context/LooperContext'

import Tick from './../../assets/metronom-1.wav'
import Tack from './../../assets/metronom-2.wav'
import MetronomIcon from './../../assets/metronom-icon'



export default function MetronomSection() {

    ///////////////////////////////////
    /// variables /////////////////////
    ///////////////////////////////////

    const MAX_BPM = 200
    const MIN_BPM = 60

    var lights

    const {
        running,
        loop,
        dispatch
    } = useContext(LooperContext)
    
    const [playerTick, setPlayerTick] = useState(new Player(Tick))
    const [playerTack, setPlayerTack] = useState(new Player(Tack))
    const [metronomVolume, setMetronomVolume] = useState(new Volume(-20))
    const [metronomEnabled, setMetronomEnabled] = useState(false)

    playerTick.connect(metronomVolume)
    playerTack.connect(metronomVolume)
    metronomVolume.toDestination()

    const metronomLoop = new Loop((time) => {

        if ( Math.abs( getCurrentTime() - getCurrentTactStartTime() ) < 0.1 ) {
            lights[3].classList.remove('active-metronom-light')
            lights[0].classList.add('active-metronom-light')
            // console.log('current tact' + getCurrentTactStartTime())
            playerTick.start(time)

        }
        else if ( Math.abs( getCurrentTime() - (getCurrentTactStartTime() + TransportTime('4n') ) ) < 0.1 ) {
            lights[0].classList.remove('active-metronom-light')
            lights[1].classList.add('active-metronom-light')
            playerTack.start(time)

        }
        else if ( Math.abs( getCurrentTime() - (getCurrentTactStartTime() + TransportTime('2n') ) ) < 0.1 ) {
            lights[1].classList.remove('active-metronom-light')
            lights[2].classList.add('active-metronom-light')
            playerTack.start(time)

        }
        else if ( Math.abs( getCurrentTime() - (getCurrentTactStartTime() + TransportTime('4n') + TransportTime('2n') ) ) < 0.1 ) {
            lights[2].classList.remove('active-metronom-light')
            lights[3].classList.add('active-metronom-light')
            playerTack.start(time)

        }

    }, '4n')

    ///////////////////////////////////
    /// effects ///////////////////////
    ///////////////////////////////////

    useEffect(() => {
        metronomLoop.start(0)
        return () => {
            metronomLoop.dispose()
        }
    }, [])

    // add event listener
    useEffect(() => {
        let inputBpm = document.getElementById('bpm')
        inputBpm.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                inputBpm.blur()
            }
        })
    }, [])

    // get metronom lights
    useEffect(() => {
        lights = document.getElementById('metronom-dots').children
    }, [])

    // set bpm when value changes
    useEffect(() => {
        if (loop != undefined) {
            document.getElementById('bpm').value = loop.bpm
            Transport.bpm.value = loop.bpm
        }
    }, [loop])

    useEffect(() => {
        if (!running) {
            document.getElementById('metronom-dots').childNodes.forEach( light => {
                light.classList.remove('active-metronom-light')
            })
        }

    }, [running])

    useEffect(() => {
        if (metronomEnabled) {
            metronomVolume.mute = false
        } else {
            metronomVolume.mute = true
        }
        
    }, [metronomEnabled])

    ///////////////////////////////////
    /// functions /////////////////////
    ///////////////////////////////////

    const getCurrentTactStartTime = () => {
        return Math.floor(Transport.getSecondsAtTime(Transport.now()) / TransportTime('1m')) * TransportTime('1m')
    }

    const getCurrentTime = () => {
        return Transport.getSecondsAtTime(Transport.now())
    }

    const enableBpmChange = () => {
        if (loop != undefined) {
            for (let i = 0; i<loop.tracks.length; i++) {
                if (loop.tracks[i].audio.length != 0) {
                    return false
                }
                else {
                    return true
                }
            }
        }
        
    }


    ///////////////////////////////////
    /// handler ///////////////////////
    ///////////////////////////////////

    const handleChangeBpm = (e) => {
        if (e.target.value < MIN_BPM) {
            e.target.value = MIN_BPM
        } else if (e.target.value > MAX_BPM) {
            e.target.value = MAX_BPM
        }
        dispatch({type: 'UPDATE_LOOP', loopname: loop.loopname, bpm: e.target.value})
    }

    const handleMetronomButton = () => {
        setMetronomEnabled(curr => !curr)
    }


    ///////////////////////////////////
    /// render ////////////////////////
    ///////////////////////////////////

    return (
        <div className="flex flex-row h-14 justify-center items-center">
            {/* metronom lights container */}
            <div id="metronom-dots" className="h-full flex flex-row items-center mr-5">
                <div className="rounded-full w-6 h-6 bg-white mr-2"></div>
                <div className="rounded-full w-6 h-6 bg-white mx-2"></div>
                <div className="rounded-full w-6 h-6 bg-white mx-2"></div>
                <div className="rounded-full w-6 h-6 bg-white ml-2"></div>
            </div>

            {/* bpm container */}
            <div data-tip data-for="bpm-tip" className={`bg-gray-elements rounded-lg py-1 px-2 mr-5`}>
                <input className={` bg-transparent text-right text-xl focus:outline-none text-white w-10 h-8 mr-1 ${(running || !enableBpmChange()) && 'pointer-events-none'}`}
                    type="number" 
                    name="bpm" 
                    id="bpm"
                    onBlur={handleChangeBpm}
                    onClick={() => document.getElementById('bpm').select()}/>
                <label className="text-white text-xs"
                htmlFor="bpm">BPM</label>
            </div>
            {
                (running || !enableBpmChange()) &&
                <ReactTooltip id="bpm-tip" type="dark">
                    You can only change the BPM when the loop is empty and stopped.
                </ReactTooltip>
            }
            
            

            {/* metronom button */}
            <button onClick={handleMetronomButton} className={` rounded-lg p-2 text-white mr-5 focus:outline-none ${metronomEnabled ? 'bg-easyloops-blue' : 'bg-gray-elements'}`}>
                <img className="w-6 h-6" src={MetronomIcon} alt="metronom" />
            </button>
        </div>
    )
}
