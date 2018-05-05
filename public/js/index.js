var socket=io();
socket.on('connect',function (){
    console.log('new user omad!');

});
socket.on('disconnect',function (){
    console.log('now user is disconnect!');
});
socket.on('newMessage',function (newMessage){
    console.log('newMessage',newMessage);
    var li=$('<li></li>');
    li.text(newMessage.from+':'+newMessage.text);
    $('#message').append(li);
});
$('#message-form').on('submit',function (e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:$('[name=message]').val()
    })
});