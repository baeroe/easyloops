import React from 'react'

export default function RecordButton() {
    return (
        <div className="flex justify-center items-center">

            {/* light ring and animation stuff */}
            <div id="rec-container">
                <div className='hold left'>
                    <div className='fill'>
                        <div className="light-ring">
                        </div>          
                    </div>
                </div>
                <div className='hold right'>
                    <div className='fill'>
                        <div className="light-ring">
                        </div>          
                    </div>
                </div>
            </div>

            {/* the actual record button */}
            <button className="focus:outline-none z-10 absolute">
                <div className="rec-button flex justify-center items-center">
                    <div className="rec-icon">
                    </div>
                </div>
            </button> 
                
        </div>
    )
}
