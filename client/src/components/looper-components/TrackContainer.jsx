import React, {useContext} from 'react'
import { LooperContext } from '../../context/LooperContext'
import EmptyTrack from './track-components/EmptyTrack'
import Track from './track-components/Track'

export default function TrackContainer() {

    const {
        loop,
        dispatch
    } = useContext(LooperContext)

    if (loop != null && loop != undefined ) {
        return (
            <div className=" overflow-scroll h-screen bg-gray-200 pt-16 pl-16 pb-2">
                <div className="flex flex-row whitespace-no-wrap h-full">
                    {
                        loop.tracks.map(track => {
                            return (
                                <Track 
                                    key={track.trackid} 
                                    track={track} 
                                />
                            )
                        })
                                        
                    }
                    <EmptyTrack />
                </div>
            </div>
        )
    } else {
        return (
            null
        )
    }
    
}
