const io = require('socket.io-client');

const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to server');

  // socket.emit('login',{
  //   "username": "yancy",
  //   "password": "123456"
  //   });

  // socket.emit('createEmployee', {
  //   "first_name": "jown",
  //   "last_name": "doe",
  //   "position": "Web extra"
  // })

  // socket.emit('getAllEmployee')

  //   socket.emit('updateEmployee', {
  //     "id": "65bbe2743e3924c6b375fc7f",
  //     "first_name": "marky update",
  //     "last_name": "ave update",
  //     "position": "Web Designer heys"
  // })

  socket.emit("deleteEmployee", {
    "id": '65bbee5994249fcd655e9a05'
  })

});

socket.on('getEmployeeData', (response) => {
    console.log('Received response from server:', response);
  });


socket.on('disconnect', () => {
  console.log('Disconnected from server');
});