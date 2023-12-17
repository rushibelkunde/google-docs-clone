import React from 'react'

import Navbar from './Components/Navbar'
import { useNavigate } from 'react-router-dom'

import { v4 as uuidV4 } from "uuid"
import { useState, useEffect } from 'react'

import { io } from 'socket.io-client'



const Home = () => {
    const navigate = useNavigate()

    const [socket, setSocket] = useState()
    const [docs, setDocs] = useState([])

    // connecting to socket
    useEffect(() => {
        const s = io("https://google-docs-clone-3e8cbb21dc27.herokuapp.com/")
        setSocket(s)
        console.log(s)
        return () => {
            s.disconnect()
        }
    }, [])


    // get all the documents from server
    useEffect(() => {
        if (socket == null) return
        socket.emit('get-documents')
        socket.on('send-documents', (documents) => {
            console.log("clientside", documents)
            setDocs(documents)
        })
    }, [socket])

    return (

        <div className=' bg-neutral-100'>
            <Navbar />
            <p className='text-center m-4 text-zinc-600'>Start a new document</p>

            <div className='flex justify-center gap-5'>

                <div className='h-[250px] w-[180px] border border-zinc-200 bg-white 
                    cursor-pointer flex justify-center items-center hover:border-blue-400'
                    onClick={() => { navigate(`/documents/${uuidV4()}`) }}>

                    <h1 className=' text-xl font-semibold text-neutral-400 '>+ Add Document</h1>

                </div>


                {docs?.map((doc) => (
                    <div className='h-[250px] w-[180px] border border-zinc-200 bg-white 
                        cursor-pointer flex  hover:border-blue-400 p-3'
                        onClick={() => { navigate(`/documents/${doc._id}`) }}>
                        <h1 className=' text-[5px] text-gray-900 '>{doc.data.ops.map((l)=>l.insert)}</h1>
                    </div>



                ))}
            </div>
        </div>
    )
}

export default Home