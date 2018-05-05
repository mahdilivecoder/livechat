var socket=io();
socket.on('connect',()=>{
    console.log('new user omad!');

});
socket.on('disconnect',()=>{
    console.log('now user is disconnect!');
});
socket.on('newMessage',(newMessage)=>{
    console.log('newMessage',newMessage);
    var li=$('<li></li>');
    li.text(newMessage.from+':'+newMessage.text);
    $('#message').append(li);
});
$('#message-form').on('submit',(e)=>{
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:$('[name=message]').val()
    })
});