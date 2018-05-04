//be semlahe rahman rahim
const path=require('path');
const http=require('http');
const express=require('express');
const socketIo=require('socket.io');

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
    socket.emit('newEmail',{
       from:"m.dev76@yahoo.com",
        text:"Hi this a livecoder",
        createAt:123
    });
    socket.on('createEmail',(newEmail)=>{
       console.log('create new email',newEmail);
    });
});
server.listen(port,()=>{
   console.log("app running on "+port);
});