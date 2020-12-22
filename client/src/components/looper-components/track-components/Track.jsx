import React, {useContext, useRef, useEffect, useState} from 'react'
import { Volume, BiquadFilter, Merge, UserMedia, Panner, Recorder, Player, Players } from 'tone'
import hash from 'object-hash'

import RecordSection from './RecordSection'
import { LooperContext } from '../../../context/LooperContext'
import TrackMenuSection from './TrackMenuSection'
import LengthSection from './LengthSection'
import EmptyTrack from './EmptyTrack'
import EQSection from './EQSection'
import TitleSection from './TitleSection'
import VolumeSection from './VolumeSection'

export default function Track({track}) {

    ///////////////////////////////////
    /// variables /////////////////////
    ///////////////////////////////////

    const trackElement = useRef(null)

    const {
        activeTrack,
        setActiveTrack,
        running
    } = useContext(LooperContext)

    // create EQ Audio Nodes
    const [userMediaNode, setUserMediaNode] = useState( () => new UserMedia())
    const [mergeNode, setMergeNode] = useState( () => new Merge()) 
    const [trebleNode, setTrebleNode] = useState( () => new BiquadFilter({
        type: "highshelf",
        Q: 1,
        frequency: 2500,
        gain: track.treble
    }))
    const [middleNode, setMiddleNode] = useState( () => new BiquadFilter({
        type: "peaking",
        Q: 1,
        frequency: 1500,
        gain: track.middle
    }))
    const [bassNode, setBassNode] = useState( () => new BiquadFilter({
        type: "lowshelf",
        Q: 1,
        frequency: 400,
        gain: track.bass
    }))
    const [volumeNode, setVolumeNode] = useState( () => new Volume(track.volume))
    const [pannerNode, setPannerNode] = useState( () => new Panner(track.panning))

    // create Recorder
    const [recorder, setRecorder] = useState(() => new Recorder())
    const [partRecorder, setPartRecorder] = useState(() => new Recorder())

    const [startTime, setStartTime] = useState(-1)

    // array that stores the loops
    const [trackLoops, setTrackLoops] = useState([])
    const trackLoopsRef = useRef(trackLoops)
    trackLoopsRef.current = trackLoops






    ///////////////////////////////////
    /// listener //////////////////////
    ///////////////////////////////////
    const activeTrackListener = () => {
        setActiveTrack(track.trackid)
    }


    ///////////////////////////////////
    /// effects ///////////////////////
    ///////////////////////////////////

    // init track and clean it up 
    useEffect(() => {

        // add event listener that activates the track if user clicks it
        trackElement.current.addEventListener('click', activeTrackListener)  

        return () => {
            if (trackLoopsRef.current.length != 0) {
                trackLoopsRef.current.forEach(loop => {
                    loop.stop()
                    loop.dispose()
                })
            }
        }

    }, [])



    // connect user media to eq 
    useEffect(() => {

        // connect userMedia to recorder
        userMediaNode.connect(recorder)
        userMediaNode.connect(partRecorder)

        // make stereo to mono
        userMediaNode.connect(mergeNode, 0, 0)
        userMediaNode.connect(mergeNode, 0, 1)
        // connect to EQ and Volume
        mergeNode.connect(trebleNode)
        trebleNode.connect(middleNode)
        middleNode.connect(bassNode)
        bassNode.connect(volumeNode)
        // connect to panner
        volumeNode.connect(pannerNode)
        // connect to destination
        pannerNode.toDestination()

        return () => {
            userMediaNode.dispose()
            mergeNode.dispose()
            trebleNode.dispose()
            middleNode.dispose()
            bassNode.dispose()
            volumeNode.dispose()
            pannerNode.dispose()
        }
    }, [])

    // when track is clicked and is active than open the userStream
    useEffect(() => {
        if (userMediaNode != null)
        if (activeTrack == track.trackid) {
            userMediaNode.open()
        } else {
            userMediaNode.close()
        }

    }, [activeTrack])

    // schedules the loop to time when the play putton is pressed
    // even when the user opens existing loop the loops are scheduled
    useEffect(() => {

        if (running == false && trackLoops != []) {
            trackLoops.forEach((loop) => {
                loop.stop()
                loop.start()
            })
        }

    }, [running])


    ///////////////////////////////////
    /// handler ///////////////////////
    ///////////////////////////////////

    const handleVolumeChange = (value) => {
        volumeNode.volume.setTargetAtTime(value, 0, 0.2)
    }

    const handleMute = (value) => {
        volumeNode.mute = value
    }

    const handleTrebleChange = (value) => {
        trebleNode.gain.setTargetAtTime(value, 0, 0.2)
    }

    const handleMiddleChange = (value) => {
        middleNode.gain.setTargetAtTime(value, 0, 0.2)
    }

    const handleBassChange = (value) => {
        bassNode.gain.setTargetAtTime(value, 0, 0.2)
    }

    const handlePanningChange = (value) => {
        pannerNode.pan.setTargetAtTime(value, 0, 0.2)
    }


    ///////////////////////////////////
    /// functions /////////////////////
    ///////////////////////////////////



    ///////////////////////////////////
    /// render ////////////////////////
    ///////////////////////////////////
    
    return (
        <div ref={trackElement} className="flex flex-col bg-gray-surface mr-4 rounded-lg px-4 py-2 items-center h-full shadow-track">

            <TrackMenuSection 
                track={track} 
                userMediaNode={userMediaNode} 
                trackLoops={trackLoops} 
                setTrackLoops={setTrackLoops}
                setStartTime={setStartTime}/>

            <TitleSection track={track} />

            <LengthSection track={track} />
            
            <RecordSection 
                track={track} 
                recorder={recorder} 
                partRecorder={partRecorder} 
                mergeNode={mergeNode} 
                trackLoops={trackLoops} 
                setTrackLoops={setTrackLoops} 
                startTime={startTime}
                setStartTime={setStartTime}
            />

            <VolumeSection 
                track={track} 
                handleVolumeChange={handleVolumeChange} 
                startTime={startTime} 
                handleMute={handleMute}/>

            <EQSection 
                track={track} 
                handleTrebleChange={handleTrebleChange} 
                handleMiddleChange={handleMiddleChange} 
                handleBassChange={handleBassChange} 
                handlePanningChange={handlePanningChange} 
            />

        </div>
    )
    
}
