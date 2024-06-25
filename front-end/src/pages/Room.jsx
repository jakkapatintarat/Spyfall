import React from 'react'
import { useParams } from 'react-router-dom'

function Room() {
    const { roomName } = useParams();
    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <h1>{roomName}</h1>
                    {/* main */}
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Room