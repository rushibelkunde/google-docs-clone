const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const Document = require('./models/Document')
const db = require('./configs/db')

const cors = require('cors')

app.use(cors({credentials: true, origin: "https://google-docs-clone-pied-iota.vercel.app"}));

const io = require('socket.io')(server, {
    cors: {
        origin: 'https://google-docs-clone-pied-iota.vercel.app',
        methods: ['GET', 'POST']
    }
})


const defaultValue = ""
io.on("connection", socket => {
    console.log("connected")

    // sending documents to client
    socket.on("get-documents", async()=>{
        console.log("serverside getdocs")
        const documents = await Document.find({})
        socket.emit("send-documents", documents)
    })

    // sending specific document and changes
    socket.on('get-document', async(documentId) => {
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit('load-document', document.data)
        socket.on('send-changes', delta=>{
        console.log(delta)
        socket.broadcast.to(documentId).emit("receive-changes", delta)
    })
    socket.on("save-document", async(data)=>{
            await Document.findByIdAndUpdate(documentId, {data})
    })
})
})


// function for finding/ creating document and returning to client
const findOrCreateDocument = async(id)=>{
    if(id == null) return
    const document = await Document.findById(id)
    if(document) return document
    return await Document.create({_id: id, data: defaultValue})
}



const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    

module.exports = app;

