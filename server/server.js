//be semlahe rahman rahim
const path=require('path');
const http=require('http');
const express=require('express');
const socketIo=require('socket.io');
const {generateMessage}=require('./utils/message');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;

var app=express();
app.use(express.static(publicPath));
//supporting socket io for using express framework
var server=http.createServer(app);


var io=socketIo(server);
io.on('connection',(socket)=>{
    console.log('New user connected!');
    socket.on('disconnect',()=>{
       console.log('User is disconnected!');
    });
    socket.emit('newMessage',generateMessage('Admin@admin.com','Hi a am mehdi or livecoder'));
    socket.broadcast.emit('newMessage',generateMessage('Livecoder@live.com',"Hi i am livecoder and ..."));
    socket.on('createMessage',(message)=>{
       console.log('createMessage',message);
       io.emit('newMessage',generateMessage(message.from,message.text));
    });
});
server.listen(port,()=>{
   console.log("app running on "+port);
});