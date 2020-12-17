import React, {useContext, useRef, useEffect, useState} from 'react'
import { Volume, BiquadFilter, Merge, UserMedia, Panner, EQ3 } from 'tone'

import RecordButton from './RecordButton'
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
        setActiveTrack
    } = useContext(LooperContext)

    // create EQ Audio Nodes
    const [userMediaNode, setUserMediaNode] = useState(new UserMedia())
    const [mergeNode, setMergeNode] = useState(new Merge()) 
    const [trebleNode, setTrebleNode] = useState(new BiquadFilter({
        type: "highshelf",
        Q: 1,
        frequency: 2500,
        gain: track.treble
    }))
    const [middleNode, setMiddleNode] = useState(new BiquadFilter({
        type: "peaking",
        Q: 1,
        frequency: 1500,
        gain: track.middle
    }))
    const [bassNode, setBassNode] = useState(new BiquadFilter({
        type: "lowshelf",
        Q: 1,
        frequency: 400,
        gain: track.bass
    }))
    const [volumeNode, setVolumeNode] = useState(new Volume(track.volume))
    const [pannerNode, setPannerNode] = useState(new Panner(track.panning))


    ///////////////////////////////////
    /// effects ///////////////////////
    ///////////////////////////////////

    // add event listener to set active track
    useEffect(() => {

        trackElement.current.addEventListener('click', () => {
            setActiveTrack(track.trackid)
        })  
    }, [])

    // connect user media to eq 
    useEffect(() => {

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


    ///////////////////////////////////
    /// handler ///////////////////////
    ///////////////////////////////////

    const handleVolumeChange = (value) => {
        volumeNode.volume.setTargetAtTime(value, 0, 0.2)
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

            <TrackMenuSection track={track} userMediaNode={userMediaNode} />

            <TitleSection track={track} />

            <LengthSection track={track} />
            
            <RecordButton track={track} />

            <VolumeSection track={track} handleVolumeChange={handleVolumeChange} />

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
