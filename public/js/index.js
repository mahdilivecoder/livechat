var socket=io();
socket.on('connect',function (){
    console.log('new user omad!');

});
socket.on('disconnect',function (){
    console.log('now user is disconnect!');
});
socket.on('newMessage',function (newMessage){
    var formattedTime=moment(newMessage.createdAt).format('h:mm a');
    var template=$('#message-template').html();
    var html=Mustache.render(template,{
        text:newMessage.text,
        from:newMessage.from,
        createdAt:formattedTime
    });
    $('#message').append(html);

});
socket.on('newLocationMessage',function(newlocation){
    var formattedTime=moment(newlocation.createdAt).format('h:mm a');
    var template=$('#location-message-template').html();
    var html=Mustache.render(template,{
       url:newlocation.url,
       from:newlocation.from,
       createdAt:formattedTime
    });
    $('#message').append(html);
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