import React, {useEffect, useContext, useState} from 'react'
import { UserContext } from '../../context/UserContext'
import {LooperContext} from './../../context/LooperContext'
import axios from 'axios'

import ControllBar from './ControllBar'
import SideMenu from './SideMenu'
import TrackContainer from './TrackContainer'

export default function Looper() {

    // get context data
    const {
        setActive
    } = useContext(LooperContext)
    
    const {
        token
    } = useContext(UserContext)

    const [user, setUser] = useState(null)

    // set the active looper state true, so that the nav bar hides
    useEffect(() => {
        setActive(true)
        return () => {
            setActive(false)
        }
    }, [])

    useEffect(() => {
        if (token) {

            // set token as Authorization header
            axios.defaults.headers.common['Authorization'] = `Baerer ${token}`

            //get user data
            axios.get('/api/user')
            .then(response => {
                //if it work's save user data and store token in the local storage
                setUser({user: response.data})
                localStorage.setItem('JWT', token)
            })
            .catch(error => {
                // if not that means the token is expired or the user doesnt exist
                console.log(error)
                setUser(null)
                setToken(null)
                localStorage.removeItem('JWT')
            })

        } else {
            localStorage.removeItem('JWT')
            setUser(null)
            axios.defaults.headers.common['Authorization'] = ''
        }

    }, [token])

    return (
        <div className="w-full h-full">
            <ControllBar user={user} />
            <SideMenu user={user} />
            <TrackContainer />

        </div>
    )
}
