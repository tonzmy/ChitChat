 //sending to sender-client only
socket.emit('message', "this is a test");

//sending to all clients except sender
socket.broadcast.emit('message', "this is a test"); 

//sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game'); 

//sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game'); 

//sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); 

//sending to all clients, include sender
io.in('game').emit('message', 'cool game'); 

//sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg'); 

//send to all connected clients
socket.emit(); 

//send to all connected clients except the one that sent the message
socket.broadcast.emit(); 

//event listener, can be called on client to execute on server
socket.on(); 

//for emiting to specific clients
io.sockets.socket(); 

//send to all connected clients (same as socket.emit)
io.sockets.emit();

//initial connection from a client.
io.sockets.on() ; 

// The io variable represents the group of sockets. 
// The code you have starts on line one with providing a function in the second parameter that 
//gives you a socket variable every time a new connection is made. 
//The socket variable is only for communicating with each individual connection. 
//You may not see it in the code but there will be one socket variable for each connection established