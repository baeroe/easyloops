import React, {useContext} from 'react'
import { LooperContext } from '../../../context/LooperContext'

export default function EmptyTrack() {

    const {
        dispatch
    } = useContext(LooperContext)

    const handleAddTrack = (e) => {
        dispatch({type: 'ADD_TRACK'})
    }

    return (
        <button onClick={handleAddTrack} className=" track-skeleton flex flex-col mr-4 rounded-lg w-48 h-full border focus:outline-none text-gray-surface justify-center items-center">
            <svg className=" w-40 h-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
        </button>
    )
}
