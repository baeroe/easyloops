import React, {useEffect} from 'react'

export default function ConfirmEmail() {

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        
    }, [])

    return (
        <div>
            <div className="bg-landingpage-darker flex justify-center">
                <div className="bg-white rounded p-10 h-fit-content mt-32 flex flex-col shadow-lg">

                    <h1 className="text-2xl mb-6 text-gray-700 text-center">Thank you! Please confirm your email address</h1>

                    <p className="text-gray-700 text-center mb-4">
                        We've send you an email <br/>
                        Please click on the link to confirm your email address
                    </p>
                    
                </div>
            </div>
        </div>
    )
}
