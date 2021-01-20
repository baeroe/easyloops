import React, {useRef, useEffect, useState, useContext} from 'react'
import { Loop, Player, ToneEvent, Transport, TransportTime, Time } from 'tone'
import { LooperContext } from '../../../context/LooperContext'

export default function RecordSection({track, recorder, partRecorder, mergeNode, setTrackLoops, trackLoops, startTime, setStartTime}) {

    const [leftAnimation, setLeftAnimation] = useState(null)
    const leftAnimationRef = useRef(leftAnimation)
    leftAnimationRef.current = leftAnimation

    const [rightAnimation, setRightAnimation] = useState(null)
    const rightAnimationRef = useRef(rightAnimation)
    rightAnimationRef.current = rightAnimation


    const startTimeRef = useRef(startTime)
    startTimeRef.current = startTime

    var leftRing = useRef(null)
    var rightRing = useRef(null)

    const FADE_IN = 0.2
    const FADE_OUT = 0.1

    const {
        loop,
        dispatch,
        running
    } = useContext(LooperContext)

    

    // effect that sets the new animation string when bpm or number of bars changed
    useEffect(() => {
        
        let ringAnimationTime = TransportTime(track.numberOfBars + 'm').toSeconds() / 2

        // reset old animation
        rightRing.current.style.animation = ""
        leftRing.current.style.animation = ""
            
        // set new animation string
        setLeftAnimation
        ( 
            "-webkit-animation: right " + ringAnimationTime + "s linear; " + 
            "-moz-animation: right " + ringAnimationTime + "s linear; " +
            "animation: right " + ringAnimationTime + "s linear both; " 
        )   
            
        setRightAnimation
        (
            "-webkit-animation: left " + ringAnimationTime + "s linear; " + 
            "-moz-animation: left " + ringAnimationTime + "s linear; " +
            "animation: left " + ringAnimationTime + "s linear both; " +
            "-webkit-animation-delay: " + ringAnimationTime + "s; " +
            "-moz-animation-delay: " + ringAnimationTime + "s; " +
            "animation-delay: " + ringAnimationTime + "s; "
        ) 

        
    }, [track.numberOfBars, loop.bpm])

    // if loop is stopped and this track has allready recorded audio loops
    // set the start Time to 0, that the getNextLoopStartTime function returns the right time
    useEffect(() => {
        if (running == false && track.audio.length != 0) {
            setStartTime(0)
        }
    }, [running])

    // set the AudioLoops if the treck has already some
    useEffect(() => {
        if (track.audio.length != 0) {
            track.audio.forEach(audioBlob => {
                addAudioLoop(audioBlob)
            }) 
        }

    }, [])

    ///////////////////////////////////
    /// RECORDING FUNCTION ////////////
    ///////////////////////////////////

    const handleRecord = () => {
        
        if (running) {

            // create record event
            let recordEvent = new ToneEvent((time) => {

                // 1. start the ring animation
                startRingAnimation()

                
                // 2. start both recorder
                setTimeout(() => { partRecorder.start() }, getLookAheadInMilli())
                setTimeout(() => { recorder.start() }, getLookAheadInMilli())


                // 3. stop part recorder after a half bar time
                setTimeout( async () => {
                    let blob = await partRecorder.stop()
                    createPartAudioEvent(blob)

                }, TransportTime( '2n' ).toMilliseconds() + getLookAheadInMilli() )

                // 4. stop recorder after full time
                setTimeout( async () => {
                    let blob = await recorder.stop()
                    createAudioEvent(blob)
                    addAudioLoop(blob)

                    track.audio.push(
                        blob
                    )
                    dispatch({type: 'UPDATE_TRACK', track: track})
                }, TransportTime( track.numberOfBars + 'm' ).toMilliseconds() + getLookAheadInMilli() )


            })

            // start event at next loop time or next start time, depending on startTime state
            // is startTime is = -1 than this is the first record event. so the loop is starting at this point
            if (startTimeRef.current == -1) {
                recordEvent.start(getNextTactStartTime())
                setStartTime(getNextTactStartTime())
            } else {
                recordEvent.start(getNextLoopStartTime(startTimeRef.current))
            }

        }
    }


    ///////////////////////////////////
    /// functions /////////////////////
    ///////////////////////////////////   

    const startRingAnimation = () => {

        if (leftRing.current.style.animation == "") {
            leftRing.current.style.cssText = leftAnimationRef.current
        } else {
            var newElement
            newElement = leftRing.current.cloneNode(true);
            leftRing.current.parentNode.replaceChild(newElement, leftRing.current);
            leftRing.current = newElement
        }

        if(rightRing.current.style.animation == "") {
            rightRing.current.style.cssText = rightAnimationRef.current
        } else {
            newElement = rightRing.current.cloneNode(true);
            rightRing.current.parentNode.replaceChild(newElement, rightRing.current);
            rightRing.current = newElement
        }
    }

    const createPartAudioEvent = (blob) => {

        let blobURL = window.URL.createObjectURL(blob)
        let player = new Player(blobURL)
        player.fadeOut = FADE_OUT

        player.connect(mergeNode, 0, 0)
        player.connect(mergeNode, 0, 1)

        new ToneEvent((time) => {
            startRingAnimation()
            player.start(time)
        }).start( getNextLoopStartTime(startTimeRef.current) )
        
    }

    const createAudioEvent = (blob) => {

        let blobURL = window.URL.createObjectURL(blob)
        let player = new Player(blobURL)
        player.fadeIn= FADE_IN

        player.connect(mergeNode, 0, 0)
        player.connect(mergeNode, 0, 1)

        new ToneEvent( (time) => {
            player.start(time, TransportTime('2n').toSeconds() - FADE_IN )
        }).start( getCurrentTactStartTime() + TransportTime('2n').toSeconds() - FADE_IN)
    }

    const addAudioLoop = (blob) => {
        let blobURL = window.URL.createObjectURL(blob)
        let player = new Player(blobURL)

        player.connect(mergeNode, 0, 0)
        player.connect(mergeNode, 0, 1)

        setTrackLoops((curr) => {

            return [
                ...curr,
                new Loop((time) => {
                    player.start(time)
                    startRingAnimation()
                }, track.numberOfBars + 'm').start(getNextLoopStartTime(startTimeRef.current))
            ]                
            
        })
    }

    const getNextTactStartTime = () => {
        return Transport.getSecondsAtTime( Time('@1m').toSeconds() )         
    }

    const getCurrentTactStartTime = () => {
        return (Math.floor(Transport.getSecondsAtTime(Transport.now()) / TransportTime('1m'))) * TransportTime('1m')
    }

    const getNextLoopStartTime = (startTime) => {

        if (startTime == -1) {
            return 0
        }

        let current = getCurrentTactStartTime()
        let length = track.numberOfBars * TransportTime('1m')
        return current + (length - (current - startTime)%length)
    }

    const getLookAheadInMilli = () => {
        return TransportTime(Transport.context.lookAhead).toMilliseconds()
    }

    return (
        <div className="flex justify-center items-center relative">

            {/* light ring and animation stuff */}
            <div id="rec-container">
                <div className='hold left'>
                    <div ref={leftRing} className='fill'>
                        <div className="light-ring">
                        </div>          
                    </div>
                </div>
                <div className='hold right'>
                    <div ref={rightRing} className='fill'>
                        <div className="light-ring">
                        </div>          
                    </div>
                </div>
            </div>

            {/* the actual record button */}
            <button onClick={handleRecord} className="focus:outline-none z-10 absolute">
                <div className="rec-button flex justify-center items-center">
                    <div className="rec-icon">
                    </div>
                </div>
            </button> 
        </div>
    )
}
