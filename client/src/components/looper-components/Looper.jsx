import React, {useEffect, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import {LooperContext} from './../../context/LooperContext'

export default function Looper() {

    const {
        active,
        setActive
    } = useContext(LooperContext)

    useEffect(() => {
        setActive(true)
        return () => {
            setActive(false)
        }
    }, [])
    return (
        <div>
            
        </div>
    )
}
