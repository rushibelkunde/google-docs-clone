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
        // const s = io("http://localhost:5000")
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

    const handleDelete = (id)=>{
        if (socket == null) return
        socket.emit('delete-doc', id)
    }

    return (

        <div className=' bg-neutral-100'>
            <Navbar />
            <p className='text-center m-4 text-zinc-600'>Start a new document</p>

            <div className='flex justify-center gap-5 flex-wrap'>

                <div className='h-[250px] w-[180px] border border-zinc-200 bg-white 
                    cursor-pointer flex justify-center items-center hover:border-blue-400'
                    onClick={() => { navigate(`/documents/${uuidV4()}`) }}>

                    <h1 className=' text-xl font-semibold text-neutral-400 '>+ Add Document</h1>

                </div>


                {docs?.map((doc) => (
                    <div className='flex flex-col'>
                    <div className='h-[250px] w-[180px] border border-zinc-200 bg-white 
                        cursor-pointer flex  hover:border-blue-400 p-3'
                        onClick={() => { navigate(`/documents/${doc._id}`) }}>
                        <h1 className=' text-[5px] text-gray-900 '>{doc.data?.ops?.map((l)=>l.insert)}</h1>
                    </div>
                    <div className='flex justify-around items-center mt-2'>
                    <span className='text-sm font-light'>{doc.name? doc.name : "Untitled Document"}</span>
                    <img src="delete.png" alt="" className=' w-4 object-contain opacity-60  hover:opacity-100'
                    onClick={()=>handleDelete(doc._id)} />
                    </div>
                    </div>



                ))}
            </div>
        </div>
    )
}

export default Home