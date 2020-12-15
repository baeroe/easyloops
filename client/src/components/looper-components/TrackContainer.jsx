import React from 'react'
import Track from './Track'

export default function TrackContainer() {
    return (
        <div className=" overflow-scroll h-screen bg-gray-200 pt-16 pl-16 pb-2">
            <div className="flex flex-row whitespace-no-wrap h-full">
                <Track />
                <Track empty={true}/>
                {/* <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/>
                <Track />
                <Track empty={true}/> */}
         
            </div>
        </div>
    )
}
