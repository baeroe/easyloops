import React, {createContext, useState} from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {

    const [token, setToken] = useState()
    const [user, setUser] = useState(null)
    const [inLooper, setInLooper] = useState(false)

    return (
        <UserContext.Provider value={{user, setUser, token, setToken, inLooper, setInLooper}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
