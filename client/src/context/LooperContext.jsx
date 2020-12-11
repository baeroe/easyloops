import React, {createContext, useState} from 'react'

export const LooperContext = createContext()

const LooperContextProvider = (props) => {

    const [active, setActive] = useState(false)
    const [sidebar, setSidebar] = useState(false)

    return (
        <LooperContext.Provider value={{active, setActive, sidebar, setSidebar}}>
            {props.children}
        </LooperContext.Provider>
    )
}

export default LooperContextProvider
