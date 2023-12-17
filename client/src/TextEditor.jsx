import React, { useCallback, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'



const TextEditor = () => {
    const {id: documentId} = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    const wrapperRef = useCallback((wrapper)=>{
        if(!wrapper) return
        wrapper.innerHTML = ''
        const editor = document.createElement('div') 
        wrapper.append(editor)
        const q =new Quill(editor,{theme: "snow"})
        q.disable()
        q.setText('Loading...')
        setQuill(q)
    },[])

    useEffect(() => {
        if (socket == null || quill == null) return;
    
        // Effect for handling text changes and emitting changes to the server
        const textChangeHandler = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit("send-changes", delta);
        };
        quill.on('text-change', textChangeHandler);
    
        // Effect for receiving changes from the server and updating the editor
        const receiveChangesHandler = (delta) => {
            quill.updateContents(delta);
        };
        socket.on('receive-changes', receiveChangesHandler);

        const interval = setInterval(()=>{

            socket.emit('save-document', quill.getContents())

        },2000)
    
        // Effect for cleaning up event listeners
        return () => {
            quill.off('text-change', textChangeHandler);
            socket.off('receive-changes', receiveChangesHandler);
            clearInterval(interval)
        };
    }, [socket, quill]);
     


    useEffect(()=>{
        const s = io("https://git.heroku.com/google-docs-clone.git")
        setSocket(s)
        return ()=>{
            s.disconnect()
        }
    },[])

    useEffect(()=>{
        if(socket==null || quill ==null) return 
        socket.once("load-document", document=> {
            quill.setContents(document)
            quill.enable()
        })
        socket.emit('get-document', documentId)

    },[socket, quill, documentId])

   

  return (
    <div className="container" ref={wrapperRef}></div>
  )
}

export default TextEditor