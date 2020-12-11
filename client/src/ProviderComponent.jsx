import React from 'react'
import UserContextProvider from './context/UserContext'
import App from './App'
import LooperContextProvider from './context/LooperContext'

export default function ProviderComponent() {
    return (
        <UserContextProvider>
            <LooperContextProvider>
                <App />
            </LooperContextProvider>
        </UserContextProvider>
    )
}
