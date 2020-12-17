// import dependencies
import React, {useEffect, useContext, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import axios from 'axios'

// import components
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Account from './components/Account'
import DeleteAccount from './components/DeleteAccount'
import ConfirmEmail from './components/ConfirmEmail'
import Looper from './components/looper-components/Looper'
import { UserContext } from './context/UserContext'
import { LooperContext } from './context/LooperContext'


export default function App() {

    ///////////////////////////////////
    /// variables /////////////////////
    ///////////////////////////////////

    // get states form context
    const {
        token,
        setToken
    } = useContext(UserContext)

    const {
        looperEntered,
        setLooperEntered
    } = useContext(LooperContext)

    const [user, setUser] = useState(null)


    ///////////////////////////////////
    /// effects ///////////////////////
    ///////////////////////////////////

    // make page unscrollable when the looper is entered
    useEffect(() => {
        if (looperEntered) {
            document.getElementsByTagName('HTML')[0].classList.add('overflow-hidden')
        } else {
            document.getElementsByTagName('HTML')[0].classList.remove('overflow-hidden')
        }
    }, [looperEntered])


    // effect that makes the nav bar transparent when at top and grey if the user scrolls down
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY==0){
                document.getElementById('navbar').classList.remove('bg-gray-900', 'shadow-lg')
            } else {
                document.getElementById('navbar').classList.add('bg-gray-900', 'shadow-lg')
            }
          });
    }, [])


    useEffect(() => {
        setToken(localStorage.getItem('JWT') || null)

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


    ///////////////////////////////////
    /// handler ///////////////////////
    ///////////////////////////////////

    const handleLogout = () => {
        setToken(null)
    }

    return (
        <Router>
            <div className="min-h-full w-full">
                {
                    !looperEntered
                    ?
                    <nav id="navbar" className="grid grid-cols-12 gap-4 h-16 w-full fixed transition-all duration-500">
                        <div className="col-start-2 col-span-3 text-white">easyloops</div>
                        
                        <div className="col-end-12 col-span-5">
                            <ul className="flex flex-row h-full items-center justify-end">

                                <Link to="/">
                                    <li className=" text-white px-4 py-2 ml-5">
                                        Home
                                    </li>
                                </Link>

                                {
                                    user 
                                    ? 
                                    <button className="focus:outline-none" onClick={handleLogout}>
                                        <li className=" text-white px-4 py-2 ml-5">
                                            Log Out
                                        </li>
                                    </button>
                                    :
                                    <Link to="/login">
                                        <li className=" text-white px-4 py-2 ml-5">
                                            Log In
                                        </li>
                                    </Link>
                                }

                                {
                                    user
                                    ?
                                    <Link to="/account">
                                        <li className=" text-black bg-white rounded px-4 py-2 ml-5">
                                            Account
                                        </li>
                                    </Link>
                                    :
                                    <Link to="/signup">
                                        <li className=" text-black bg-white rounded px-4 py-2 ml-5">
                                            Sign Up
                                        </li>
                                    </Link>
                                }

                                <Link to="/looper">
                                    <li className=" text-white bg-easyloops-blue rounded px-4 py-2 ml-5">
                                        Looper
                                    </li>
                                </Link>

                            </ul>
                        </div>
                    </nav>
                    :
                    null
                }   

                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/delete">
                        <DeleteAccount />
                    </Route>
                    <Route path="/account">
                        <Account />
                    </Route>
                    <Route path="/confirm">
                        <ConfirmEmail />
                    </Route>
                    <Route path="/looper">
                        <Looper />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                    
                </Switch>
            </div>
        </Router>
    )
}
