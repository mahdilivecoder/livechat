//be semlahe rahman rahim
const path=require('path');
const http=require('http');
const express=require('express');
const socketIo=require('socket.io');
const {generateMessage,generateLocationMessage}=require('./utils/message');
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
    socket.broadcast.emit('newMessage',generateMessage('Admin',"Welcome to the live chat!"));
    socket.on('createMessage',(message,callback)=>{
       console.log('createMessage',message);
       io.emit('newMessage',generateMessage(message.from,message.text));
       callback();
    });
    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude+','+coords.longitude));
    });
});
server.listen(port,()=>{
   console.log("app running on "+port);
});