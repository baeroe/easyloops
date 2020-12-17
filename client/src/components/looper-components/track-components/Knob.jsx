import React, {useEffect, useState, useRef} from 'react'

export default function Knob({maxValue, minValue, value, setValue}) {

    var knobElement = useRef(null)
    var minAngle = -145
    var maxAngle = 145
    var numberOfAngles = parseFloat(Math.abs(minAngle)) + parseFloat(Math.abs(maxAngle))
    var numberOfValues = (parseFloat(Math.abs(minValue)) + parseFloat(Math.abs(maxValue)))
    // value of one degree
    var step = numberOfValues/numberOfAngles

    // for drag controll
    var hold = false

    useEffect(() => {
        calculateAngleFromValue(value)

    }, [])

    // add event listener for mousewheel
    // function checks deltaY value (from -1 and 1 for up and down)
    // if value is positive call moveKnob with the "up" parameter or when negative with "down" parameter
    useEffect(() => {

        knobElement.current.addEventListener('wheel', (e) => {
            if(e.deltaY > 0) {
                moveKnob('up');
            } else if (e.deltaY < 0) {
                moveKnob('down');
            }
            return false;
        });

        knobElement.current.addEventListener('mousedown', (e) => {
            hold=true
        });

        document.addEventListener('mouseup', (e) => {
            if (hold == true) {
                hold=false
            }
        });
        document.addEventListener('mousemove', (e) => {
            if (hold === true) {
                if (e.movementY > 0) {
                    moveKnob('down')
                } else if (e.movementY < 0) {
                    moveKnob('up')
                }
            }
        })
    }, [])

    // function get fired when mouse is moved above knob
    // decrement or increment the angle acording to the direction of the mouse scroll
    function moveKnob(direction) {
        
        if(direction == 'up') {
            if((value + step) <= maxValue) {
                value = value + step
                calculateAngleFromValue(value)

            }
        }
        else if(direction == 'down') {
            if((value - step) >= minValue) {
                value = value - step
                calculateAngleFromValue(value)
            }
        }
        setValue(value)
    }

    const setAngle = (angle) => {
        knobElement.current.style.cssText = 
            "-moz-transform:rotate("+angle+"deg); " +
            "-webkit-transform:rotate("+angle+"deg); " +
            " -o-transform:rotate("+angle+"deg); " +
            "-ms-transform:rotate("+angle+"deg); " +
            "transform:rotate("+angle+"deg);"    
    }

    const calculateAngleFromValue = (value) => {
        let angle = (value - (numberOfValues/2) - minValue) / step
        setAngle(angle)
    }

    return (
        <div className="relative">
            <div ref={knobElement} className="knob w-12 h-12 bg-gray-elements rounded-full knob-shadow">
            </div>
            <div className="left-dot absolute rounded-full bg-white"></div>
            <div className="right-dot absolute rounded-full bg-white"></div>
        </div>
    )
}
