import React, {createContext, useState} from 'react'

export const LooperContext = createContext()

const LooperContextProvider = (props) => {

    const [active, setActive] = useState(false)

    return (
        <LooperContext.Provider value={{active, setActive}}>
            {props.children}
        </LooperContext.Provider>
    )
}

export default LooperContextProvider
