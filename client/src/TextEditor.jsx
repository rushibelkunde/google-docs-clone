import React, { useCallback, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]



const TextEditor = () => {
    const {id: documentId} = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    const [docName, SetDocName] = useState()

    const wrapperRef = useCallback((wrapper)=>{
        if(!wrapper) return
        wrapper.innerHTML = ''
        const editor = document.createElement('div') 
        wrapper.append(editor)
        const q =new Quill(editor,{
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS },
        })
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
        const s = io("https://google-docs-clone-3e8cbb21dc27.herokuapp.com/")
        // const s = io("http://localhost:5000")
        setSocket(s)

        
        return ()=>{
            s.disconnect()
        }
    },[])

    useEffect(()=>{
        if(socket==null || quill ==null) return 
        socket.once("load-document", document=> {
            quill.setContents(document.data)
            quill.enable()
            SetDocName(document.name? document.name: "Untitled Document")
        })
        socket.emit('get-document', documentId)

    },[socket, quill, documentId])

    useEffect(()=>{
        if(socket==null || quill ==null) return 
        socket.emit('docname-change', docName)
    },[docName, socket])



   

  return (

    <>
    <div className='top-0 fixed z-10 ml-40'>
    <input type="text" placeholder='Untitled Document' value={docName} className='p-2 bg-transparent focus:outline-zinc-600'
    onChange={(e)=> SetDocName(e.target.value)}/>
    </div>
    <div className="container" ref={wrapperRef}>
    </div>
    </>
  )
}

export default TextEditor