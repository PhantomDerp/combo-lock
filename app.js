"use strict";

//variables
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 8080;
const password = Math.floor(Math.random() * 10000);

//create server
app.use(express.static(__dirname + '/client/'));

http.listen(port, function() {
  console.log('listening on port ' + String(port));
});

//socket.io
io.on('connection', function(socket) {
  console.log('socket connect');
  
  socket.on('codeGuess', function(data) {
    if (data === password) {socket.emit('passwordCheck', true)} else {socket.emit('passwordCheck', false)}
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //hints
  
  var letters = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ()\',;.:+1{}+=0</';
  var letters2 = 'nopqrstuvwxyzabcdefghijklm NOPQRSTUVWXYZABCDEFGHIJKLM()\',;.:+1{}+=0</';
 
 function decode(string) {
   var output = '';
   for (var i in string) {
     output += letters2[letters.indexOf(string[i])];
   }
   return output;
 }
 
  socket.on('getHint', function(data) {
    var hint;
    
    if (data === 'hint1') {
      hint = decode('hfr gur vafcrpg ryrzrag pbafbyr');
    } else if (data === 'hint2') {
      hint = decode('shyy fbhepr pbqr: uggcf://tvguho.pbz/CunagbzQrec/pbzob-ybpx');
    } else if (data === 'hint3') {
      hint = decode("fraq pbqr gb freire jvgu fbpxrg.rzvg('pbqrThrff', QNGN);");
    } else if (data === 'hint4') {
      hint = decode('Tbbtyr frnepu: oehgr sbepvat');
    } else if (data === 'solution') {
      hint = decode("chg guvf shapgvba vagb pbafbyr sbe (ine v = 0; v < 10000; v++) {fbpxrg.rzvg('pbqrThrff', v)}");
    }
    
    socket.emit('hint', [data, hint]);
  });
});
