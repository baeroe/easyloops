import React,{useEffect, useContext, useState} from 'react'
import { useHistory} from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import axios from 'axios'

export default function DeleteAccount() {

    const {
        token,
        setToken
    } = useContext(UserContext)

    let history = useHistory()

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [user, setUser] = useState(null)

    // windows is scrooel to the top when page is entered
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        
    }, [])

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

    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete('/api/user')
        .then(response => {
            setToken(null)
            history.push('/home')
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleChange = (e) => {
        if (e.target.value == user.user.email) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }

    return (
        <div className="bg-landingpage-darker flex justify-center">
            <div className="bg-white rounded p-10 h-fit-content mt-32 flex flex-col shadow-lg">
                <h1 className="text-2xl mb-6 text-gray-700 text-center">Danger zone</h1>

                <p className="text-gray-700 text-center mb-4">
                    If you delete your account there will be no way to restore it. <br/>
                    To delete your account enter your email address then hit the "Delete account" button!
                </p>

                <form className="flex flex-col self-center" onSubmit={handleDelete}>
                    <label className="text-gray-600 text-sm" 
                        htmlFor="email"
                        >Email</label>
                    <input className="w-80 h-12 bg-gray-300 text-md text-gray-700 px-2 rounded mb-6 focus:outline-none focus:shadow-inner hover:shadow-inner transition-shadow duration-300" 
                        type="email" 
                        name="email" 
                        autoComplete="off"
                        placeholder={user ? user.user.email : null}
                        onChange={handleChange}
                        id="email"/>
                </form>

                
                <button disabled={buttonDisabled} onClick={handleDelete} className={`focus:outline-none w-80 h-12 bg-easyloops-red text-white rounded hover:shadow-lg transition duration-300 mb-4 place-self-center ${buttonDisabled ? 'opacity-50' : null}`}>
                    Delete my account
                </button>

                <p className="text-gray-700 text-center">This action is permanent!</p>
                
            </div>
        </div>
    )
}
