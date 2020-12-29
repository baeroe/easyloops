import axios from 'axios'
import {v4 as uuid} from 'uuid'

export const LoopReducer = (state, action) => {
    switch (action.type) {
        
        case 'CREATE_LOOP':
            state = {
                loopid: uuid(),
                loopname: "New Loop",
                bpm: 120,
                tracks: [
                    {
                        trackid: uuid(),
                        trackname: "New Track",
                        numberOfBars: 2,
                        volume: 0,
                        treble: 0,
                        middle: 0,
                        bass: 0,
                        panning: 0,
                        audio: [

                        ]
                    }
                ]
            }
            return state

        case 'LOAD_LOOP':
            state = {
                ...action.loop,
            }
            return state

        case 'UPDATE_LOOP':
            state = {
                ...state,
                loopname: action.loopname,
                bpm: action.bpm,
            }
            return state

        case 'DECODE_LOOP':
            state = {
                ...action.loop
            }
            return state

        case 'ADD_TRACK':
            state = {
                ...state,
                tracks: [
                    ...state.tracks,
                    {
                        trackid: uuid(),
                        trackname: "New Track",
                        numberOfBars: 2,
                        volume: 0.5,
                        treble: 0,
                        middle: 0,
                        bass: 0,
                        panning: 0,
                        audio: [

                        ]
                    }
                ]
            }
            return state

        case 'DELETE_TRACK':
            state = {
                ...state,
                tracks: state.tracks.filter(track => track.trackid !== action.id)
                
            }
            return state

        case 'UPDATE_TRACK':
            state = {
                ...state,
                tracks: state.tracks.map(track => {
                    if (track.trackid === action.track.trackid) {
                        return action.track
                    } else {
                        return track
                    }
                })
            }
            return state

        default:
            return state
    }

}