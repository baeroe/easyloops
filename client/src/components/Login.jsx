import React, {useEffect, useContext, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

export default function Login() {

    // get history to manage redirects
    let history = useHistory()

    // get setToken from context
    const { 
        setToken 
    } = useContext(UserContext)

    // some states
    const [serverError, setServerError] = useState(null)   
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        var email = document.getElementById('email').value
        var password = document.getElementById('password').value

        axios.post('/api/auth', {
            email: email,
            password: password
        }).then(function (response) {
            setToken(response.data.accessToken)
            history.push('/')
        })
        .catch(function (error) {
            setServerError(error.response.status)
        })

    }

    return (
        <div className="bg-landingpage-darker flex justify-center">
            <div className="bg-white rounded p-10 h-fit-content mt-32 shadow-lg">

                <h1 className="text-2xl text-center w-full mb-6 text-gray-700">Sign in to your account</h1>

                <form className="flex flex-col" onSubmit={handleSubmit}>

                    <label className="text-gray-600 text-sm" 
                        htmlFor="email"
                        >Email</label>
                    <input className={`w-80 h-12 bg-gray-300 text-md text-gray-700 px-2 rounded focus:outline-none focus:shadow-inner hover:shadow-inner transition-shadow duration-300 ${serverError == 400 ? 'border-red-600 border' : null}`} 
                        type="email" 
                        name="email" 
                        id="email"
                        required={true}/>
                    {
                        serverError == 400
                        ?
                        <span className="text-red-600 text-sm">No user with that email</span>
                        :
                        null
                    }

                    <label className="text-gray-600 text-sm mt-2" 
                        htmlFor="password"
                        >Password</label>
                    <input className={`w-80 h-12 bg-gray-300 text-md text-gray-700 px-2 rounded focus:outline-none focus:shadow-inner hover:shadow-inner transition-shadow duration-300 ${serverError == 403 ? 'border-red-600 border' : null}`} 
                        type="password" 
                        name="password" 
                        id="password"
                        required={true}/>
                    {
                        serverError == 403
                        ?
                        <span className="text-red-600 text-sm">Wrong password</span>
                        :
                        null
                    }


                    <Link className="text-center w-full mb-6 text-gray-600 hover:text-blue-600 text-sm mt-2" to="/reset-pw">Forgot password?</Link>

                    <input className="focus:outline-none w-80 h-12 bg-easyloops-blue text-white rounded hover:shadow-lg mb-2 transition-shadow duration-300"
                        type="submit" 
                        value="Log In"/>

                    <span className="text-center w-full text-gray-600 text-sm">
                        Don't have an account? <Link className="text-blue-600" to="/signup">Sign Up</Link> 
                    </span>

                </form>
            </div>
        </div>
    )
}
