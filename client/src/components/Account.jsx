import React, {useEffect, useContext, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {UserContext} from './../context/UserContext'
import axios from 'axios'

export default function Account() {

    const {
        token,
        setToken,
    } = useContext(UserContext)

    const [user, setUser] = useState(null)

    let history = useHistory()


    // windows scrolls on top of the site
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        
    }, [])

    // if user is not logged in he gets redirected
    // if he is logged in and the user data is empty it gets load from the db
    useEffect(() => {
        if (!token) {
            // redirect bc user is not logged in
            history.replace('/login')
        } else {
            // set token as Authorization header
            axios.defaults.headers.common['Authorization'] = `Baerer ${token}`
        }
        // get user data from db
        axios.get('/api/user')
        .then(response => {
            setUser({user: response.data})
        })
        .catch(error => {
            console.log(error)
        })

    }, [])

    // if user state is empty load it from db 
    useEffect(() => {
        
    }, [])

    const handleLogout = () => {
        setToken(null)
        history.push('/')
    }


    return (
        <div className="bg-landingpage-darker flex justify-center">
            <div className="bg-white rounded p-10 h-fit-content mt-32 flex flex-col shadow-lg">

                <h1 className="text-2xl w-full text-gray-700">{ user ? user.user.username : null}</h1>
                <span className="text-lg w-full mb-6 text-gray-700">{user ? user.user.email: null}</span>

                <button onClick={handleLogout} className=" focus:outline-none w-80 h-12 bg-easyloops-blue text-white rounded hover:shadow-lg transition-shadow duration-300 mb-6">
                    Sign Out
                </button>

                <Link to="/delete">
                    <button className="focus:outline-none w-80 h-12 bg-easyloops-red text-white rounded hover:shadow-lg transition-shadow duration-300 ">
                        Delete Account
                    </button>
                </Link>

            </div>
        </div>
    )
}
