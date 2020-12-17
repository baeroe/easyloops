import React, {useRef, useEffect, useState, useContext} from 'react'
import { Transport, TransportTime } from 'tone'
import { LooperContext } from '../../../context/LooperContext'

export default function RecordButton({track}) {

    const [leftAnimation, setLeftAnimation] = useState(null)
    const [rightAnimation, setRightAnimation] = useState(null)

    var leftRing = useRef(null)
    var rightRing = useRef(null)

    const {
        loop
    } = useContext(LooperContext)

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

    ///////////////////////////////////
    /// handler ///////////////////////
    ///////////////////////////////////

    const handleRecord = () => {
        startRingAnimation()
    }

    ///////////////////////////////////
    /// functions /////////////////////
    ///////////////////////////////////   

    const startRingAnimation = () => {

        if (leftRing.current.style.animation == "") {
            leftRing.current.style.cssText = leftAnimation
        } else {
            var newElement
            newElement = leftRing.current.cloneNode(true);
            leftRing.current.parentNode.replaceChild(newElement, leftRing.current);
            leftRing.current = newElement
        }

        if(rightRing.current.style.animation == "") {
            rightRing.current.style.cssText = rightAnimation
        } else {
            newElement = rightRing.current.cloneNode(true);
            rightRing.current.parentNode.replaceChild(newElement, rightRing.current);
            rightRing.current = newElement
        }
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
