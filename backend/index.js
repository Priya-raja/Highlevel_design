require('dotenv').config();
const express = require('express');
const http = require ('http')
const { Server } = require("socket.io");

const app = express()

const PORT = process.env.PORT || 5300;

const server = http.createServer(app)

const io = new Server(server,{
   cors:{
      allowedHeaders: ["*"],
      origin: "*"
   }
})

app.get('/', (req, res) => {
   res.send("Welcome to HHLD Chat App!");
});


io.on('connection', (socket)=>{
   console.log('a user is connected')
   socket.on('chat msg', (msg)=>{
      console.log("received",msg)
      io.emit('chat msg', msg);

   })
   socket.on('disconnect', ()=>{
      console.log("a user is disconnected")
   })
});

server.listen(PORT, (req,res)=>{
   console.log(`Server is running on port ${PORT}`)}
)


