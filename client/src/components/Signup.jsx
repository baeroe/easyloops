import React, {useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'

export default function Signup() {

    let history = useHistory()
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        var username = document.getElementById('username').value
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value

        axios.post('/api/user', {
            username: username,
            email: email,
            password: password
        }).then(function (response) {
            console.log(response)
            history.push('/confirm')
        })
        .catch(function (error) {
            console.log(error);
        })

    }

    return (
        <div className="bg-landingpage-darker flex justify-center">
            <div className="bg-white rounded p-10 h-fit-content mt-32 shadow-lg">

                <h1 className="text-2xl text-center w-full mb-6 text-gray-700">Create an account</h1>

                <form className="flex flex-col" onSubmit={handleSubmit}>

                    <label className="text-gray-600 text-sm" 
                        htmlFor="username"
                        >Username</label>
                    <input className="w-80 h-12 bg-gray-300 text-md text-gray-700 px-2 rounded mb-2 hover:shadow-inner focus:shadow-inner transition-shadow duration-300 focus:outline-none" 
                        type="text" 
                        name="username" 
                        id="username"
                        required={true}/>

                    <label className="text-gray-600 text-sm" 
                        htmlFor="email"
                        >Email</label>
                    <input className="w-80 h-12 bg-gray-300 text-md text-gray-700 px-2 rounded mb-2 hover:shadow-inner focus:shadow-inner transition-shadow duration-300 focus:outline-none" 
                        type="email" 
                        name="email" 
                        id="email"
                        required={true}/>

                    <label className="text-gray-600 text-sm" 
                        htmlFor="password"
                        >Password</label>
                    <input className="w-80 h-12 bg-gray-300 text-md text-gray-700 px-2 rounded mb-6 hover:shadow-inner focus:shadow-inner transition-shadow duration-300 focus:outline-none"
                        type="password" 
                        name="password" 
                        id="password"
                        required={true}/>

                    <input className="focus:outline-none w-80 h-12 bg-easyloops-blue text-white rounded hover:shadow-lg mb-2 transition-shadow duration-300"
                        type="submit" 
                        value="Sign Up"/>


                    <span className="text-center w-full text-gray-600 text-sm">
                        Allready have an account? <Link className="text-blue-600" to="/login">Log In</Link> 
                    </span>



                </form>
            </div>
        </div>
    )
}
