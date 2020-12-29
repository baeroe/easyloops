import React from 'react'

export default function Home() {
    return (
        <div>
            <div className="bg-landingpage">
                <div className="grid grid-cols-12">
                    <div className="mt-64 text-white text-5xl font-semibold col-start-2 col-span-8">
                        Create audio loops easy and intuitive
                    </div>
                    <div className="col-start-2 text-white text-xl col-span-8">
                        Be a one-man-band and create music for you and your friends. <br/>
                        100 percent free                 
                    </div>
                </div>
                <div className="flex justify-center mt-40">
                    <button className="bg-easyloops-blue text-white px-8 py-4 rounded focus:outline-none hover:shadow-lg">Get Started</button>
                </div>
                <div className="flex justify-center mt-6">
                    <span className="text-white">Learn more</span>
                </div>
                <div className="flex justify-center mt-4">
                    <span className="text-white text-2xl">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </span>
                </div>
            </div>



            <div className="h-64 bg-white"></div>
            <div className="h-64 bg-white"></div>
            <div className="h-64 bg-white"></div>
            <div className="h-64 bg-black"></div>
            <div className="h-64 bg-black"></div>
            <div className="h-64 bg-black"></div>
            <div className="h-64 bg-white"></div>
            <div className="h-64 bg-white"></div>
            <div className="h-64 bg-white"></div>
            <div className="h-64 bg-black"></div>        
            <div className="h-64 bg-black"></div>        
            <div className="h-64 bg-black"></div>        
        </div>

    )
}
