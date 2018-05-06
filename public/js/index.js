var socket=io();
socket.on('connect',function (){
    console.log('new user omad!');

});
socket.on('disconnect',function (){
    console.log('now user is disconnect!');
});
socket.on('newMessage',function (newMessage){
    var li=$('<li></li>');
    li.text(newMessage.from+':'+newMessage.text);
    $('#message').append(li);
});
socket.on('newLocationMessage',function(newlocation){
   var li =$('<li></li>');
   var a=$('<a target="_blank">My current location</a>')
    li.text(newlocation.from+':');
   a.attr('href',newlocation.url);
   li.append(a);
    $('#message').append(li);
});
$('#message-form').on('submit',function (e){
    e.preventDefault();
    var messageTextBox=$('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.val()
    },function () {
        messageTextBox.val('');
    });
});
var locationButton=$('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
     return alert('geolocation is not supported by your location');
    }
    locationButton.attr('disabled','disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
           latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function () {
        alert('Unable to fetch location!');
        locationButton.removeAttr('disabled').text('Send location');
    })
});