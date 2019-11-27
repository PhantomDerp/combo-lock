"use strict";

var socket = io();

//test code
function testCode() {
  //get innerHTMLs to number
  var value = Number(document.getElementById('n1').innerHTML + document.getElementById('n2').innerHTML + document.getElementById('n3').innerHTML + document.getElementById('n4').innerHTML);
  
  //send to server
  socket.emit('codeGuess', value);
}

//change button values
function buttonClick(id) {
  document.getElementById(id).innerHTML = String(Number(document.getElementById(id).innerHTML) + 1).slice(-1);
}

//receive data from server
socket.on('passwordCheck', function(data) {
  if (data) {document.getElementById('codebox').style = 'background-color: green'}
});


//receive hints from server
socket.on('hint', function(data) {
  document.getElementById(data[0]).innerHTML = data[1];
});
